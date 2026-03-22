import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 年月日のリスト
const createYearList = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const year = start + i;
    return {
      label: String(year),
      value: String(year),
    };
  });
};
const currentYear = new Date().getFullYear();
export const yearList = createYearList(currentYear - 100, currentYear);

export const monthList = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));

export const dayList = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));
