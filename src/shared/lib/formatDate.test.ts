import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats date string to numeric format by default', () => {
    expect(formatDate('2023-07-02')).toBe('02 / 07 / 2023');
  });

  it('formats Date object to numeric format by default', () => {
    expect(formatDate(new Date(2023, 6, 2))).toBe('02 / 07 / 2023');
  });

  it('formats date string to shortText format with ru-RU locale', () => {
    expect(formatDate('2023-07-02', 'shortText', 'ru-RU')).toBe('02 / Июль / 2023');
  });

  it('formats Date object to shortText format with ru-RU locale', () => {
    expect(formatDate(new Date(2023, 6, 2), 'shortText', 'ru-RU')).toBe('02 / Июль / 2023');
  });

  it('pads single digit day and month with zero', () => {
    expect(formatDate('2023-01-05')).toBe('05 / 01 / 2023');
  });

  it('capitalizes short month name with ru-RU locale', () => {
    const result = formatDate('2023-03-15', 'shortText', 'ru-RU');
    expect(result).toMatch(/^15 \/ [А-ЯЁ][а-яё]+ \/ 2023$/);
  });
});
