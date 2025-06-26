import { motion } from 'framer-motion';
import { OrderCard } from '@/processes';
import { useAppSelector } from '@/shared';
import { containerVariants, cardVariants } from './animations';

export const OrdersPage = () => {
  const { orders } = useAppSelector((state) => state.order);

  return (
    <motion.div
      className="d-flex flex-column gap-2 p-5 h-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key="orders-list"
    >
      {orders.map((order) => (
        <motion.div key={order.id} variants={cardVariants}>
          <OrderCard order={order} />
        </motion.div>
      ))}
    </motion.div>
  );
};
