export type JwtToken = string;

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  id_token: JwtToken;
}

export interface AuthorityDTO {
  name: string;
}

export interface AdminUserDTO {
  id?: number;
  login: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  imageUrl?: string | null;
  activated?: boolean;
  langKey?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: string | null;
  authorities?: string[];
}

export interface ManagedUserVM extends AdminUserDTO {
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordFinishRequest {
  key: string;
  newPassword: string;
}

export interface PaginationHeaders {
  totalCount?: number;
  link?: string;
}
