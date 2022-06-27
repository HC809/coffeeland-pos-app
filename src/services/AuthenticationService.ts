import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { ADMIN_AUTH_USER } from 'src/constants/localStorage';
import { ILoggedUser } from '@/models/Authentication/Authentication.models';

const initAuthState: ILoggedUser = {
  username: null,
  token: null,
  logged: false,
  invoicePoint: 0,
  openCashFlow: 0,
  cashFlowOpened: false,
};

export const getAuthUser = (): ILoggedUser => {
  const encryptedAuth = Cookies.get(ADMIN_AUTH_USER);
  if (!encryptedAuth) return initAuthState;

  const bytes = CryptoJS.AES.decrypt(
    encryptedAuth,
    process.env.REACT_APP_CRYPTO_SALT || ''
  );

  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return initAuthState;
  }
};

export const setAuthUser = (auth: ILoggedUser): void => {
  const encryptedAuth = CryptoJS.AES.encrypt(
    JSON.stringify(auth),
    process.env.REACT_APP_CRYPTO_SALT || ''
  ).toString();

  Cookies.set(ADMIN_AUTH_USER, encryptedAuth);
};

export const removeAuthUser = (): void => {
  Cookies.remove(ADMIN_AUTH_USER);
};
