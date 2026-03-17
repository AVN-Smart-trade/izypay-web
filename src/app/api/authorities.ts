import { request } from './client';
import type { AuthorityDTO } from './types';

export async function createAuthority(name: string): Promise<void> {
  await request<void>('/api/authorities', { method: 'POST', auth: true, body: { name } satisfies AuthorityDTO });
}

export async function listAuthorities(): Promise<AuthorityDTO[]> {
  const { data } = await request<AuthorityDTO[]>('/api/authorities', { method: 'GET', auth: true });
  return data;
}

export async function getAuthority(id: string): Promise<AuthorityDTO> {
  const { data } = await request<AuthorityDTO>(`/api/authorities/${encodeURIComponent(id)}`, { method: 'GET', auth: true });
  return data;
}

export async function deleteAuthority(id: string): Promise<void> {
  await request<void>(`/api/authorities/${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });
}
