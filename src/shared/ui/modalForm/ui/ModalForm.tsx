import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './ModalForm.css';

interface ModalFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  children: ReactNode;
}

export const ModalForm = ({ isOpen, onCancel, onConfirm, title, children }: ModalFormProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-form"
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-form__dialog"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="modal-form__content d-flex flex-column h-100">
              <div className="modal-form__header d-flex justify-content-between align-items-center">
                <h5 className="modal-form__title mb-0">{title || 'Форма'}</h5>
                <button
                  type="button"
                  className="modal-form__close"
                  aria-label="Закрыть"
                  onClick={onCancel}
                >
                  ×
                </button>
              </div>

              <div className="modal-form__body flex-grow-1 overflow-auto">{children}</div>

              <div className="modal-form__footer d-flex justify-content-end gap-3">
                <button type="button" className="modal-form__btn-cancel" onClick={onCancel}>
                  Отмена
                </button>
                <button type="button" className="modal-form__btn-confirm" onClick={onConfirm}>
                  Сохранить
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
