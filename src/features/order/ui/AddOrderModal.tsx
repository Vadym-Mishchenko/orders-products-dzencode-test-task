import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { Order } from '@/entities';
import { ModalForm } from '@/shared';

interface AddOrderModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (order: Omit<Order, 'id' | 'products'>) => void;
}

type FormData = {
  title: string;
  description: string;
};

export const AddOrderModal = ({ isOpen, onCancel, onConfirm }: AddOrderModalProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const today = new Date().toISOString().split('T')[0];
    onConfirm({
      title: data.title.trim(),
      date: today,
      description: data.description.trim(),
    });
    reset();
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onCancel={() => {
        reset();
        onCancel();
      }}
      onConfirm={handleSubmit(onSubmit)}
      title={t('Add Order')}
    >
      <form noValidate>
        <div className="mb-3">
          <label htmlFor="orderTitle" className="form-label">
            {t('Order Title')} <sup style={{ color: 'red' }}>*</sup>
          </label>
          <input
            id="orderTitle"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title', {
              required: t('Order Title is required'),
              validate: (value) => value.trim() !== '' || t('Order Title is required'),
            })}
            autoFocus
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="orderDescription" className="form-label">
            {t('Order Description')} <sup style={{ color: 'red' }}>*</sup>
          </label>
          <textarea
            id="orderDescription"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            rows={3}
            {...register('description', {
              required: t('Order Description is required'),
              validate: (value) => value.trim() !== '' || t('Order Description is required'),
            })}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>
      </form>
    </ModalForm>
  );
};
