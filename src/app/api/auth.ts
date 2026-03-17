import { request } from './client';
import { clearToken, setToken } from './tokenStore';
import type { LoginRequest, LoginResponse } from './types';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await request<LoginResponse>('/api/authenticate', {
    method: 'POST',
    auth: false,
    body: {
      username: payload.username,
      password: payload.password,
      rememberMe: payload.rememberMe ?? true,
    },
  });

  setToken(data.id_token, payload.rememberMe ?? true);
  return data;
}

export async function logout(): Promise<void> {
  clearToken();
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    await request<void>('/api/authenticate', { method: 'GET', auth: true });
    return true;
  } catch {
    return false;
  }
}
