import { readPaginationHeaders, request } from './client';
import type { AdminUserDTO } from './types';

export async function adminListUsers(params: {
  page?: number;
  size?: number;
  sort?: string;
} = {}) {
  const search = new URLSearchParams();
  if (params.page !== undefined) search.set('page', String(params.page));
  if (params.size !== undefined) search.set('size', String(params.size));
  if (params.sort) search.set('sort', params.sort);

  const qs = search.toString();
  const { data, headers } = await request<AdminUserDTO[]>(`/api/admin/users${qs ? `?${qs}` : ''}`, {
    method: 'GET',
    auth: true,
  });

  return { users: data, pagination: readPaginationHeaders(headers) };
}

export async function adminGetUser(login: string): Promise<AdminUserDTO> {
  const { data } = await request<AdminUserDTO>(`/api/admin/users/${encodeURIComponent(login)}`, { method: 'GET', auth: true });
  return data;
}

export async function adminCreateUser(payload: AdminUserDTO): Promise<void> {
  await request<void>('/api/admin/users', { method: 'POST', auth: true, body: payload });
}

export async function adminUpdateUser(payload: AdminUserDTO, login?: string): Promise<void> {
  const path = login ? `/api/admin/users/${encodeURIComponent(login)}` : '/api/admin/users';
  await request<void>(path, { method: 'PUT', auth: true, body: payload });
}

export async function adminDeleteUser(login: string): Promise<void> {
  await request<void>(`/api/admin/users/${encodeURIComponent(login)}`, { method: 'DELETE', auth: true });
}
