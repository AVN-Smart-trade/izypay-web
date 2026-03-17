import { request } from './client';

/**
 * Call a downstream microservice via Spring Cloud Gateway discovery.
 * Example: serviceRequest('wallet-service', '/api/wallets') -> GET /services/wallet-service/api/wallets
 */
export async function serviceRequest<T>(
  serviceId: string,
  path: string,
  options?: Omit<Parameters<typeof request<T>>[1], 'auth'> & { auth?: boolean }
) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return request<T>(`/services/${encodeURIComponent(serviceId)}${normalized}`, {
    ...(options ?? {}),
    auth: options?.auth ?? true,
  });
}
