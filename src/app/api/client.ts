import { getToken } from './tokenStore';

export class ApiError extends Error {
  status: number;
  url: string;
  details?: unknown;

  constructor(message: string, status: number, url: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
    this.details = details;
  }
}

function resolveBaseUrl(): string {
  const fromEnv = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv?.trim() || 'http://localhost:8080').replace(/\/$/, '');
}

function joinUrl(baseUrl: string, path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalized}`;
}

export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  rawBody?: string;
  auth?: boolean;
  signal?: AbortSignal;
}

export interface ApiResponse<T> {
  data: T;
  headers: Headers;
  status: number;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const baseUrl = resolveBaseUrl();
  const url = joinUrl(baseUrl, path);
  const token = getToken();

  const headers: Record<string, string> = {
    ...(options.headers ?? {}),
  };

  const hasJsonBody = options.body !== undefined && options.rawBody === undefined;
  if (hasJsonBody && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  if (!headers['Accept']) {
    headers['Accept'] = 'application/json';
  }

  const wantsAuth = options.auth ?? true;
  if (wantsAuth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: options.method ?? (hasJsonBody || options.rawBody !== undefined ? 'POST' : 'GET'),
    headers,
    body: options.rawBody ?? (hasJsonBody ? JSON.stringify(options.body) : undefined),
    signal: options.signal,
  });

  const contentType = res.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    let details: unknown = undefined;
    try {
      details = isJson ? await res.json() : await res.text();
    } catch {
      // ignore
    }

    const message =
      typeof details === 'string'
        ? details
        : (details as any)?.message || (details as any)?.title || res.statusText || 'Request failed';
    throw new ApiError(message, res.status, url, details);
  }

  if (res.status === 204) {
    return { data: undefined as T, headers: res.headers, status: res.status };
  }

  if (isJson) {
    const data = (await res.json()) as T;
    return { data, headers: res.headers, status: res.status };
  }

  const text = (await res.text()) as unknown as T;
  return { data: text, headers: res.headers, status: res.status };
}

export function readPaginationHeaders(headers: Headers) {
  const totalCountHeader = headers.get('X-Total-Count');
  const totalCount = totalCountHeader ? Number(totalCountHeader) : undefined;
  const link = headers.get('Link') ?? undefined;
  return { totalCount: Number.isFinite(totalCount) ? totalCount : undefined, link };
}
