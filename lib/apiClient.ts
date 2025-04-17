import { getItem } from '@/utils/localstorage';
import { createFetchOptions } from './createFetchOptions';

const getAccessToken = () => getItem<string>('accessToken') ?? undefined;

const fetcher = createFetchOptions({
  getAccessToken,
});

export const apiClient = {
  get<T>(url: string, options?: RequestInit) {
    return fetcher<T>(url, { ...options, method: 'GET' });
  },
  post<T>(url: string, data?: unknown, options?: RequestInit) {
    return fetcher<T>(url, { ...options, method: 'POST', data });
  },
  put<T>(url: string, data?: unknown, options?: RequestInit) {
    return fetcher<T>(url, { ...options, method: 'PUT', data });
  },
  delete<T>(url: string, options?: RequestInit) {
    return fetcher<T>(url, { ...options, method: 'DELETE' });
  },
};
