import { cookies } from 'next/headers';
import { createFetchOptions } from './createFetchOptions';

const getAccessToken = async () => {
  const cookie = await cookies();
  return cookie.get('accessToken')?.value;
};

const fetcher = createFetchOptions({
  getAccessToken,
});

export const apiServer = {
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
