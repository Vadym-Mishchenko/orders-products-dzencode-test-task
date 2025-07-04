import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// --- REST API ---
// Проверка сервера
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Заказы
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ include: { products: true } });
    res.json(orders);
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const order = await prisma.order.create({
      data: { title, description, date: new Date(date) },
    });
    res.status(201).json(order);
  } catch {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: { title, description, date: new Date(date) },
    });
    res.json(order);
  } catch {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.updateMany({
      where: { orderId: Number(id) },
      data: { orderId: null },
    });

    await prisma.order.delete({ where: { id: Number(id) } });

    res.json({ message: 'Order deleted, products detached' });
  } catch {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Продукты
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const {
      serialNumber,
      isNew,
      photo,
      title,
      type,
      specification,
      guaranteeStart,
      guaranteeEnd,
      priceValueUSD,
      priceValueUAH,
      orderId,
      date,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        serialNumber,
        isNew,
        photo,
        title,
        type,
        specification,
        guaranteeStart: new Date(guaranteeStart),
        guaranteeEnd: new Date(guaranteeEnd),
        priceValueUSD,
        priceValueUAH,
        orderId,
        date: new Date(date),
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      error: 'Failed to create product',
      details: error instanceof Error ? error.message : error,
    });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.guaranteeStart) data.guaranteeStart = new Date(data.guaranteeStart);
    if (data.guaranteeEnd) data.guaranteeEnd = new Date(data.guaranteeEnd);
    if (data.date) data.date = new Date(data.date);

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    res.json(product);
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: 'Product deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// --- Socket.io ---
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let sessionCount = 0;

io.on('connection', (socket) => {
  sessionCount++;
  io.emit('sessionCount', sessionCount);

  socket.on('disconnect', () => {
    sessionCount = Math.max(0, sessionCount - 1);
    io.emit('sessionCount', sessionCount);
  });
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
