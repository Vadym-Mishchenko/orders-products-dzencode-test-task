import { useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const today = new Date().toISOString().split('T')[0];
    onConfirm({
      title: data.title,
      date: today,
      description: data.description,
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
      title="Добавить приход"
    >
      <form noValidate>
        <div className="mb-3">
          <label htmlFor="orderTitle" className="form-label">
            Название <sup style={{ color: 'red' }}>*</sup>
          </label>
          <input
            id="orderTitle"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title', { required: 'Название обязательно' })}
            autoFocus
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="orderDescription" className="form-label">
            Описание <sup style={{ color: 'red' }}>*</sup>
          </label>
          <textarea
            id="orderDescription"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            rows={3}
            {...register('description', { required: 'Описание обязательно' })}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>
      </form>
    </ModalForm>
  );
};
