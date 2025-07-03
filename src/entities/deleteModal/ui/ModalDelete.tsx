import type { Product } from '@/features';
import { CardAvatar, CardIndicator, CardTitleWithSerial } from '@/shared';
import { FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './ModalDelete.css';

interface ModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
  product?: Product;
}

export const ModalDelete = ({ isOpen, onConfirm, onCancel, message, product }: ModalProps) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modaldelete"
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modaldelete__content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="modaldelete__content-inner">
              <div className="modaldelete__header">{message ?? t('Are you sure?')}</div>

              {product && (
                <div className="modaldelete__product-info">
                  <CardIndicator color={product.isNew ? 'green' : 'gray'} width="12px" />
                  <CardAvatar src={`/images/${product.photo}`} width="88px" />
                  <CardTitleWithSerial
                    title={product.title}
                    serialNumber={product.serialNumber}
                    width="60%"
                  />
                </div>
              )}

              <div className="modaldelete__footer">
                <button className="button button--cancel" onClick={onCancel}>
                  {t('Cancel')}
                </button>
                <button className="button button--confirm" onClick={onConfirm}>
                  <FaTrash style={{ marginRight: '8px' }} />
                  {t('Delete')}
                </button>
              </div>
            </div>

            <button
              className="modaldelete__close"
              onClick={onCancel}
              aria-label={t('Close modal')}
              type="button"
            ></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
