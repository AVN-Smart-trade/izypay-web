import { request } from './client';
import type {
    AdminUserDTO,
    ChangePasswordRequest,
    ManagedUserVM,
    ResetPasswordFinishRequest,
} from './types';

export async function register(payload: ManagedUserVM): Promise<void> {
  await request<void>('/api/register', { method: 'POST', auth: false, body: payload });
}

export async function activate(key: string): Promise<void> {
  await request<void>(`/api/activate?key=${encodeURIComponent(key)}`, { method: 'GET', auth: false });
}

export async function getAccount(): Promise<AdminUserDTO> {
  const { data } = await request<AdminUserDTO>('/api/account', { method: 'GET', auth: true });
  return data;
}

export async function updateAccount(payload: AdminUserDTO): Promise<void> {
  await request<void>('/api/account', { method: 'POST', auth: true, body: payload });
}

export async function changePassword(payload: ChangePasswordRequest): Promise<void> {
  await request<void>('/api/account/change-password', { method: 'POST', auth: true, body: payload });
}

export async function resetPasswordInit(email: string): Promise<void> {
  // Backend expects plain text body (JSON string), not an object
  await request<void>('/api/account/reset-password/init', {
    method: 'POST',
    auth: false,
    headers: { 'Content-Type': 'text/plain' },
    rawBody: JSON.stringify(email),
  });
}

export async function resetPasswordFinish(payload: ResetPasswordFinishRequest): Promise<void> {
  await request<void>('/api/account/reset-password/finish', { method: 'POST', auth: false, body: payload });
}
