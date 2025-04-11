export type FetchOptionsType = {
  getAccessToken: () => string | undefined | Promise<string | undefined>;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function createFetchOptions({ getAccessToken }: FetchOptionsType) {
  return async function fetcher<T>(
    url: string,
    options: RequestInit & {
      data?: unknown;
      next?: NextFetchRequestConfig;
    } = {}
  ): Promise<{ data: T; status: number }> {
    const { data, headers, next, ...restOptions } = options;
    const token = await getAccessToken();

    const isFormData = data instanceof FormData;

    const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
      ...restOptions,
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
    };

    if (data && options.method && options.method !== 'GET') {
      fetchOptions.body = isFormData ? data : JSON.stringify(data);
    }

    if (next) {
      fetchOptions.next = next;
    }

    const fullUrl = url.startsWith('/api') ? url : `${BASE_URL}${url}`;

    const res = await fetch(fullUrl, fetchOptions);

    const contentType = res.headers.get('content-type');

    const isJson = contentType?.includes('application/json');

    const responseData: T = isJson ? await res.json() : ({} as T);

    return {
      data: responseData,
      status: res.status,
    };
  };
}
