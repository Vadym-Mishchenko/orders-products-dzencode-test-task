const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
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
