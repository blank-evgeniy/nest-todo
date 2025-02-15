import Cookies from 'js-cookie';
import { AUTH_TOKEN_COOKIE } from '../../consts';

export const getAuthToken = () => {
  const authToken = Cookies.get(AUTH_TOKEN_COOKIE);
  return authToken || null;
};

export const saveAuthToken = (authToken: string) => {
  Cookies.set(AUTH_TOKEN_COOKIE, authToken, { expires: 7 });
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_COOKIE);
};
