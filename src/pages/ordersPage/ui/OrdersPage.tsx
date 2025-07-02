import { useState, useEffect } from 'react';
import { OrderCard } from '@/processes';
import {
  deleteOrderThunk,
  fetchOrdersThunk,
  createOrderThunk,
  AddOrderModal,
  updateProductOrderThunk,
} from '@/features';
import { useAppSelector, useAppDispatch } from '@/shared';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBoxOpen, FaPlus } from 'react-icons/fa';
import type { Product } from '@/features';
import { ModalDelete, Order, ProductList } from '@/entities';

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.order);

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeCollapsedOrderId, setActiveCollapsedOrderId] = useState<number | null>(null);

  const [productToDelete, setProductToDelete] = useState<{
    orderId: number;
    product: Product;
  } | null>(null);

  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);

  // Загрузка заказов при монтировании
  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    setSelectedOrderId(id);
  };

  const handleConfirmDeleteOrder = () => {
    if (selectedOrderId !== null) {
      dispatch(deleteOrderThunk(selectedOrderId));
      setSelectedOrderId(null);
      if (activeCollapsedOrderId === selectedOrderId) {
        setActiveCollapsedOrderId(null);
        setIsCollapsed(false);
      }
    }
  };

  const handleCancelDeleteOrder = () => {
    setSelectedOrderId(null);
  };

  const toggleCollapse = (id: number) => {
    if (isCollapsed && activeCollapsedOrderId === id) {
      // Развернуть назад
      setIsCollapsed(false);
      setActiveCollapsedOrderId(null);
    } else {
      setIsCollapsed(true);
      setActiveCollapsedOrderId(id);
    }
  };

  const closeProductList = () => {
    setIsCollapsed(false);
    setActiveCollapsedOrderId(null);
  };

  const openDeleteProductModal = (orderId: number, product: Product) => {
    setProductToDelete({ orderId, product });
  };

  const handleConfirmDeleteProduct = () => {
    if (productToDelete) {
      dispatch(updateProductOrderThunk({ productId: productToDelete.product.id, orderId: null }));
      setProductToDelete(null);
    }
  };

  const handleCancelDeleteProduct = () => {
    setProductToDelete(null);
  };

  const handleOpenAddOrderModal = () => {
    setIsAddOrderModalOpen(true);
  };

  const handleCancelAddOrderModal = () => {
    setIsAddOrderModalOpen(false);
  };

  // Теперь создание заказа через thunk
  const handleConfirmAddOrder = async (newOrder: Omit<Order, 'id' | 'products'>) => {
    try {
      await dispatch(createOrderThunk(newOrder)).unwrap();
      setIsAddOrderModalOpen(false);
    } catch (err) {
      console.error('Ошибка при создании заказа:', err);
      // Можно показать уведомление пользователю
    }
  };

  return (
    <div className="orders-list d-flex flex-column gap-2 p-5 h-100" style={{ overflowY: 'auto' }}>
      <h4>
        Приходы / {loading ? 'Загрузка...' : orders.length}
        {error && <span style={{ color: 'red', marginLeft: 10 }}>{error}</span>}
      </h4>

      <button
        style={{ width: 'max-content' }}
        className="product-list__add-btn d-flex align-items-center gap-2 mb-4 border-0 bg-transparent"
        onClick={handleOpenAddOrderModal}
      >
        <div className="product-list__add-icon d-flex justify-content-center align-items-center">
          <FaPlus className="product-list__add-icon-svg" />
        </div>
        <span className="product-list__add-text">Добавить приход</span>
      </button>

      {orders.length === 0 && !loading && (
        <div className="p-5 text-center text-muted d-flex flex-column justify-content-center align-items-center h-100 w-100">
          <FaBoxOpen size={128} className="mb-3 text-secondary" />
          <h2>Сейчас приходов нет</h2>
        </div>
      )}

      <AnimatePresence>
        {orders.map((order, index) => (
          <div key={order.id} className="position-relative" style={{ minHeight: '70px' }}>
            <motion.div
              style={{ flexShrink: 0 }}
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

            {isCollapsed && activeCollapsedOrderId === order.id && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="position-absolute"
                style={{
                  top: 0,
                  left: '320px',
                  marginLeft: '12px',
                  zIndex: 10,
                }}
              >
                <ProductList
                  orderId={order.id}
                  orderTitle={order.title}
                  onClose={closeProductList}
                  onRemoveProduct={(orderId, product) => openDeleteProductModal(orderId, product)}
                />
              </motion.div>
            )}
          </div>
        ))}
      </AnimatePresence>

      <ModalDelete
        isOpen={selectedOrderId !== null}
        onConfirm={handleConfirmDeleteOrder}
        onCancel={handleCancelDeleteOrder}
        message="Вы уверены, что хотите удалить этот приход?"
      />

      <ModalDelete
        isOpen={productToDelete !== null}
        onConfirm={handleConfirmDeleteProduct}
        onCancel={handleCancelDeleteProduct}
        message="Вы уверены, что хотите удалить этот продукт из списка заказа?"
        product={productToDelete?.product}
      />

      <AddOrderModal
        isOpen={isAddOrderModalOpen}
        onCancel={handleCancelAddOrderModal}
        onConfirm={handleConfirmAddOrder}
      />
    </div>
  );
};
