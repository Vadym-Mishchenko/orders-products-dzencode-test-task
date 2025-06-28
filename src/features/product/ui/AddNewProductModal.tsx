import { useForm } from 'react-hook-form';
import type { Product } from '@/features';
import { ModalForm } from '@/shared';
import { useAppSelector } from '@/shared';

interface AddProductModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (product: Product) => void;
}

type FormData = {
  title: string;
  serialNumber?: number;
  isNew: '1' | '0';
  type: string;
  specification: string;
  guaranteeStart: string;
  guaranteeEnd: string;
  priceUAH: number;
  priceUSD: number;
  order: number;
};

export const AddNewProductModal = ({ isOpen, onCancel, onConfirm }: AddProductModalProps) => {
  const orders = useAppSelector((state) => state.order.orders);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      isNew: '1',
      priceUAH: 0,
      priceUSD: 0,
    },
  });

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
      serialNumber: data.serialNumber ?? 0,
      isNew: data.isNew === '1' ? 1 : 0,
      photo: getPhotoByType(data.type),
      title: data.title,
      type: data.type,
      specification: data.specification,
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
      title="Создать новый продукт"
    >
      <form noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Название <sup style={{ color: 'red' }}>*</sup>
          </label>
          <input
            id="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title', { required: 'Название обязательно' })}
            autoFocus
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="serialNumber" className="form-label">
            Серийный номер
          </label>
          <input
            id="serialNumber"
            type="number"
            className={`form-control ${errors.serialNumber ? 'is-invalid' : ''}`}
            {...register('serialNumber', {
              valueAsNumber: true,
              min: { value: 1, message: 'Серийный номер должен быть положительным' },
            })}
          />
          {errors.serialNumber && (
            <div className="invalid-feedback">{errors.serialNumber.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Тип <sup style={{ color: 'red' }}>*</sup>
          </label>
          <select
            id="type"
            className={`form-select ${errors.type ? 'is-invalid' : ''}`}
            {...register('type', { required: 'Тип обязателен' })}
          >
            <option value="">Выберите тип</option>
            <option value="Monitors">Monitors</option>
            <option value="Accessories">Accessories</option>
            <option value="Laptops">Laptops</option>
          </select>
          {errors.type && <div className="invalid-feedback">{errors.type.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="isNew" className="form-label">
            Состояние <sup style={{ color: 'red' }}>*</sup>
          </label>
          <select
            id="isNew"
            className={`form-select ${errors.isNew ? 'is-invalid' : ''}`}
            {...register('isNew', { required: 'Состояние обязательно' })}
          >
            <option value="1">Новый</option>
            <option value="0">Б/У</option>
          </select>
          {errors.isNew && <div className="invalid-feedback">{errors.isNew.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="specification" className="form-label">
            Спецификация <sup style={{ color: 'red' }}>*</sup>
          </label>
          <textarea
            id="specification"
            className={`form-control ${errors.specification ? 'is-invalid' : ''}`}
            {...register('specification', { required: 'Спецификация обязательна' })}
          />
          {errors.specification && (
            <div className="invalid-feedback">{errors.specification.message}</div>
          )}
        </div>

        <div className="d-flex gap-2 mb-3">
          <div className="flex-grow-1">
            <label htmlFor="guaranteeStart" className="form-label">
              Гарантия начало
            </label>
            <input
              id="guaranteeStart"
              type="date"
              className="form-control"
              {...register('guaranteeStart')}
            />
          </div>
          <div className="flex-grow-1">
            <label htmlFor="guaranteeEnd" className="form-label">
              Гарантия конец
            </label>
            <input
              id="guaranteeEnd"
              type="date"
              className="form-control"
              {...register('guaranteeEnd')}
            />
          </div>
        </div>

        <div className="d-flex gap-2 mb-3">
          <div className="flex-grow-1">
            <label htmlFor="priceUAH" className="form-label">
              Цена (UAH) <sup style={{ color: 'red' }}>*</sup>
            </label>
            <input
              id="priceUAH"
              type="number"
              step="0.01"
              className={`form-control ${errors.priceUAH ? 'is-invalid' : ''}`}
              {...register('priceUAH', {
                required: 'Цена в гривнах обязательна',
                valueAsNumber: true,
              })}
            />
            {errors.priceUAH && <div className="invalid-feedback">{errors.priceUAH.message}</div>}
          </div>

          <div className="flex-grow-1">
            <label htmlFor="priceUSD" className="form-label">
              Цена (USD) <sup style={{ color: 'red' }}>*</sup>
            </label>
            <input
              id="priceUSD"
              type="number"
              step="0.01"
              className={`form-control ${errors.priceUSD ? 'is-invalid' : ''}`}
              {...register('priceUSD', {
                required: 'Цена в долларах обязательна',
                valueAsNumber: true,
              })}
            />
            {errors.priceUSD && <div className="invalid-feedback">{errors.priceUSD.message}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="order" className="form-label">
            Приход <sup style={{ color: 'red' }}>*</sup>
          </label>
          <select
            id="order"
            className={`form-select ${errors.order ? 'is-invalid' : ''}`}
            {...register('order', { required: 'Приход обязателен', valueAsNumber: true })}
          >
            <option value="">Выберите приход</option>
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
