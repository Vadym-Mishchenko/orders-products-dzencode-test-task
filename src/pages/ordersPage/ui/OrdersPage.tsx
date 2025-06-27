import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OrderCard } from '@/processes';
import { deleteOrder } from '@/entities';
import { useAppSelector, useAppDispatch } from '@/shared';
import { ModalDelete } from '@/entities';
import { FaBoxOpen } from 'react-icons/fa';

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeCollapsedOrderId, setActiveCollapsedOrderId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedOrderId(id);
  };

  const handleConfirmDelete = () => {
    if (selectedOrderId !== null) {
      dispatch(deleteOrder(selectedOrderId));
      setSelectedOrderId(null);
    }
  };

  const handleCancelDelete = () => {
    setSelectedOrderId(null);
  };

  const toggleCollapse = (id: number) => {
    setIsCollapsed((prev) => !prev);
    setActiveCollapsedOrderId(id);
  };

  if (orders.length === 0) {
    return (
      <div className="p-5 text-center text-muted d-flex flex-column justify-content-center align-items-center h-100 w-100">
        <FaBoxOpen size={128} className="mb-3 text-secondary" />
        <h2>Сейчас приходов нет</h2>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-2 p-5 h-100">
      <AnimatePresence>
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: index * 0.1,
            }}
            layout
          >
            <OrderCard
              order={order}
              onDelete={() => handleDelete(order.id)}
              isCollapsed={isCollapsed}
              onToggleCollapse={() => toggleCollapse(order.id)}
              showExpandIcon={order.id === activeCollapsedOrderId && isCollapsed}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <ModalDelete
        isOpen={selectedOrderId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Вы уверены, что хотите удалить этот приход?"
      />
    </div>
  );
};
