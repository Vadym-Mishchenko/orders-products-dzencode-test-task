import { useForm } from 'react-hook-form';
import type { Product } from '@/features';
import { ModalForm, useAppSelector } from '@/shared';
import { useTranslation } from 'react-i18next';

interface AddProductModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (product: Product) => void;
}

type FormData = {
  title: string;
  serialNumber: number;
  isNew: string;
  type: string;
  specification: string;
  guaranteeStart: string;
  guaranteeEnd: string;
  priceUAH: number;
  priceUSD: number;
  order: number;
};

export const AddNewProductModal = ({ isOpen, onCancel, onConfirm }: AddProductModalProps) => {
  const { t } = useTranslation();
  const orders = useAppSelector((state) => state.order.orders);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      isNew: 'true',
      priceUAH: 0,
      priceUSD: 0,
    },
  });

  const guaranteeStart = watch('guaranteeStart');

  const getPhotoByType = (type: string): string => {
    switch (type) {
      case 'Monitors':
        return 'monitor.jpg';
      case 'Accessories':
        return 'accessory.jpg';
      case 'Laptops':
        return 'laptop.jpg';
      default:
        return 'default.jpg';
    }
  };

  const handleSubmitForm = (data: FormData) => {
    const newProduct: Product = {
      id: Date.now(),
      serialNumber: data.serialNumber,
      isNew: data.isNew === 'true',
      photo: getPhotoByType(data.type),
      title: data.title.trim(),
      type: data.type,
      specification: data.specification.trim(),
      guarantee: {
        start: data.guaranteeStart || '',
        end: data.guaranteeEnd || '',
      },
      price: [
        { value: data.priceUSD, symbol: 'USD', isDefault: 0 },
        { value: data.priceUAH, symbol: 'UAH', isDefault: 1 },
      ],
      order: data.order,
      date: new Date().toISOString().split('T')[0],
    };

    onConfirm(newProduct);
    reset();
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onCancel={() => {
        reset();
        onCancel();
      }}
      onConfirm={handleSubmit(handleSubmitForm)}
      title={t('Create new product')}
    >
      <form noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            {t('Title')} <sup style={{ color: 'red' }}>*</sup>
          </label>
          <input
            id="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title', {
              required: t('Title is required'),
              validate: (value) => value.trim() !== '' || t('Title is required'),
            })}
            autoFocus
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="serialNumber" className="form-label">
            {t('Serial Number')} <sup style={{ color: 'red' }}>*</sup>
          </label>
          <input
            id="serialNumber"
            type="number"
            className={`form-control ${errors.serialNumber ? 'is-invalid' : ''}`}
            {...register('serialNumber', {
              required: t('Serial number is required'),
              valueAsNumber: true,
              min: { value: 1, message: t('Serial number must be positive') },
            })}
          />
          {errors.serialNumber && (
            <div className="invalid-feedback">{errors.serialNumber.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            {t('Type')} <sup style={{ color: 'red' }}>*</sup>
          </label>
          <select
            id="type"
            className={`form-select ${errors.type ? 'is-invalid' : ''}`}
            {...register('type', { required: t('Type is required') })}
          >
            <option value="">{t('Select type')}</option>
            <option value="Monitors">{t('Monitors')}</option>
            <option value="Accessories">{t('Accessories')}</option>
            <option value="Laptops">{t('Laptops')}</option>
          </select>
          {errors.type && <div className="invalid-feedback">{errors.type.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="isNew" className="form-label">
            {t('Condition')} <sup style={{ color: 'red' }}>*</sup>
          </label>
          <select
            id="isNew"
            className={`form-select ${errors.isNew ? 'is-invalid' : ''}`}
            {...register('isNew', { required: t('Condition is required') })}
          >
            <option value="true">{t('New')}</option>
            <option value="false">{t('Used')}</option>
          </select>
          {errors.isNew && <div className="invalid-feedback">{errors.isNew.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="specification" className="form-label">
            {t('Specification')} <sup style={{ color: 'red' }}>*</sup>
          </label>
          <textarea
            id="specification"
            className={`form-control ${errors.specification ? 'is-invalid' : ''}`}
            {...register('specification', {
              required: t('Specification is required'),
              validate: (value) => value.trim() !== '' || t('Specification is required'),
            })}
          />
          {errors.specification && (
            <div className="invalid-feedback">{errors.specification.message}</div>
          )}
        </div>

        <div className="d-flex gap-2 mb-3">
          <div className="flex-grow-1">
            <label htmlFor="guaranteeStart" className="form-label">
              {t('Guarantee start')} <sup style={{ color: 'red' }}>*</sup>
            </label>
            <input
              id="guaranteeStart"
              type="date"
              className={`form-control ${errors.guaranteeStart ? 'is-invalid' : ''}`}
              {...register('guaranteeStart', {
                required: t('Guarantee start date is required'),
              })}
            />
            {errors.guaranteeStart && (
              <div className="invalid-feedback">{errors.guaranteeStart.message}</div>
            )}
          </div>

          <div className="flex-grow-1">
            <label htmlFor="guaranteeEnd" className="form-label">
              {t('Guarantee end')} <sup style={{ color: 'red' }}>*</sup>
            </label>
            <input
              id="guaranteeEnd"
              type="date"
              className={`form-control ${errors.guaranteeEnd ? 'is-invalid' : ''}`}
              {...register('guaranteeEnd', {
                required: t('Guarantee end date is required'),
                validate: (value) => {
                  if (!guaranteeStart) return true;
                  return value >= guaranteeStart || t('End date cannot be earlier than start date');
                },
              })}
            />
            {errors.guaranteeEnd && (
              <div className="invalid-feedback">{errors.guaranteeEnd.message}</div>
            )}
          </div>
        </div>

        <div className="d-flex gap-2 mb-3">
          <div className="flex-grow-1">
            <label htmlFor="priceUAH" className="form-label">
              {t('Price (UAH)')} <sup style={{ color: 'red' }}>*</sup>
            </label>
            <input
              id="priceUAH"
              type="number"
              step="0.01"
              className={`form-control ${errors.priceUAH ? 'is-invalid' : ''}`}
              {...register('priceUAH', {
                required: t('Price in UAH is required'),
                valueAsNumber: true,
              })}
            />
            {errors.priceUAH && <div className="invalid-feedback">{errors.priceUAH.message}</div>}
          </div>

          <div className="flex-grow-1">
            <label htmlFor="priceUSD" className="form-label">
              {t('Price (USD)')} <sup style={{ color: 'red' }}>*</sup>
            </label>
            <input
              id="priceUSD"
              type="number"
              step="0.01"
              className={`form-control ${errors.priceUSD ? 'is-invalid' : ''}`}
              {...register('priceUSD', {
                required: t('Price in USD is required'),
                valueAsNumber: true,
              })}
            />
            {errors.priceUSD && <div className="invalid-feedback">{errors.priceUSD.message}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="order" className="form-label">
            {t('Order')} <sup style={{ color: 'red' }}>*</sup>
          </label>
          <select
            id="order"
            className={`form-select ${errors.order ? 'is-invalid' : ''}`}
            {...register('order', { required: t('Order is required'), valueAsNumber: true })}
          >
            <option value="">{t('Select order')}</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.title}
              </option>
            ))}
          </select>
          {errors.order && <div className="invalid-feedback">{errors.order.message}</div>}
        </div>
      </form>
    </ModalForm>
  );
};
