import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getItem } from '../utils/localstorage';

export function createApi(
  baseConfig: {
    baseURL?: string;
    headers?: Record<string, string>;
  } = {}
) {
  const { baseURL = process.env.NEXT_PUBLIC_BASE_URL, headers: baseHeaders = {} } = baseConfig;

  const getAccessToken = async (): Promise<string | undefined> => {
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookie = await cookies();
      return cookie.get('accessToken')?.value;
    } else {
      return getItem<string>('accessToken') ?? undefined;
    }
  };

  async function fetcher<T>(
    url: string,
    options: RequestInit & {
      data?: unknown;
      next?: NextFetchRequestConfig;
    } = {}
  ): Promise<T & { status?: number }> {
    const { data, next, headers, ...restOptions } = options;
    const accessToken = await getAccessToken();

    const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
      ...restOptions,
      headers: {
        ...baseHeaders,
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };

    if (data && options.method && options.method !== 'GET') {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      };
      fetchOptions.body = JSON.stringify(data);
    }

    if (next) {
      fetchOptions.next = next;
    }

    const response = await fetch(`${baseURL}${url}`, fetchOptions);

    if (response.status === 401) {
      if (typeof window === 'undefined') {
        throw NextResponse.redirect(new URL('/login', response.url));
      } else {
        redirect('/login');
      }
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      return { ...json, status: response.status };
    }

    return { status: response.status } as T & { status?: number };
  }

  return {
    get<T>(
      url: string,
      options: Omit<RequestInit, 'method'> & { next?: NextFetchRequestConfig } = {}
    ): Promise<T> {
      return fetcher<T>(url, { ...options, method: 'GET' });
    },

    post<T>(
      url: string,
      data?: unknown,
      options: Omit<RequestInit, 'method' | 'body'> & { next?: NextFetchRequestConfig } = {}
    ): Promise<T> {
      return fetcher<T>(url, { ...options, method: 'POST', data });
    },

    put<T>(
      url: string,
      data?: unknown,
      options: Omit<RequestInit, 'method' | 'body'> & { next?: NextFetchRequestConfig } = {}
    ): Promise<T> {
      return fetcher<T>(url, { ...options, method: 'PUT', data });
    },

    delete<T>(
      url: string,
      options: Omit<RequestInit, 'method'> & { next?: NextFetchRequestConfig } = {}
    ): Promise<T> {
      return fetcher<T>(url, { ...options, method: 'DELETE' });
    },
  };
}

export const api = createApi({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
