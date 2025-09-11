// utils/scrollLocales.ts
type ScrollState = {
  y: number;
  page: number;
  search: string;
};

const SCROLL_KEY = 'scrollLocales';

export const getScrollLocales = (): Record<number, ScrollState> => {
  const raw = sessionStorage.getItem(SCROLL_KEY);
  return raw ? JSON.parse(raw) : {};
};

export const saveScrollLocales = (servicioId: number, s: ScrollState) => {
  const all = getScrollLocales();
  all[servicioId] = s;
  sessionStorage.setItem(SCROLL_KEY, JSON.stringify(all));
};

export const getScrollForServicio = (servicioId: number): ScrollState | null => {
  const all = getScrollLocales();
  return all[servicioId] ?? null;
};

export const clearScrollForServicio = (servicioId: number) => {
  const all = getScrollLocales();
  delete all[servicioId];
  sessionStorage.setItem(SCROLL_KEY, JSON.stringify(all));
};
