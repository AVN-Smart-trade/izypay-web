const LOCAL_KEY = 'izypay.jwt.local';
const SESSION_KEY = 'izypay.jwt.session';

export function getToken(): string | null {
  return localStorage.getItem(LOCAL_KEY) ?? sessionStorage.getItem(SESSION_KEY);
}

export function setToken(token: string, rememberMe: boolean): void {
  clearToken();
  if (rememberMe) {
    localStorage.setItem(LOCAL_KEY, token);
  } else {
    sessionStorage.setItem(SESSION_KEY, token);
  }
}

export function clearToken(): void {
  localStorage.removeItem(LOCAL_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
