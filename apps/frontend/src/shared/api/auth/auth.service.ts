import { axiosClassic } from '../../config/api/api';
import { removeAuthToken, saveAuthToken } from '../../config/api/auth-token';
import { AuthRequestData, LoginResponse, RegisterResponse } from '../../types/auth';

class AuthService {
  private BASE_URL = '/auth';

  getQueryKey(otherKeys: string[] | string) {
    if (typeof otherKeys === 'string') return [this.BASE_URL, otherKeys];
    return [this.BASE_URL, ...otherKeys];
  }

  async login(data: AuthRequestData) {
    const response = await axiosClassic.post<LoginResponse>(`${this.BASE_URL}/login`, data);

    const accessToken = response.data.access_token;

    if (accessToken) saveAuthToken(accessToken);

    return response.data;
  }

  async register(data: AuthRequestData) {
    const response = await axiosClassic.post<RegisterResponse>(`${this.BASE_URL}/register`, data);

    const accessToken = response.data.access_token;

    if (accessToken) saveAuthToken(accessToken);

    return response.data;
  }

  async logout() {
    removeAuthToken();
  }
}

export const authService = new AuthService();
