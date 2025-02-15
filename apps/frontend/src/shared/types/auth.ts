export interface AuthRequestData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterResponse {
  id: number;
  name: string | null;
  email: string;
}
