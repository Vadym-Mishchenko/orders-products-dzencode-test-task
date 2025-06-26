type FormatType = 'shortText' | 'numeric';

export const formatDate = (dateInput: string | Date, format: FormatType = 'numeric'): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  if (format === 'shortText') {
    const month = date.toLocaleString('ru-RU', { month: 'short' }).replace('.', '');
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} / ${capitalizedMonth} / ${year}`;
  }

  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day} / ${month} / ${year}`;
};
