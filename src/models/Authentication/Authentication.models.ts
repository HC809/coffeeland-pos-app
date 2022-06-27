export interface ILoginUser {
  email: string;
  password: string;
}

export interface IAuthResponse {
  username: string;
  token: string;
}

export interface ILoggedUser {
  username: string | null;
  token: string | null;
  logged: boolean;
}
