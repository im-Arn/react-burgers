import { SERVER_URL } from "./serverUrl";
import { TRegisterUser, TLoginUser  } from "../../services/types/types";

class Api {
  private _server: string;
  
  constructor(server: string) {
    this._server = server;
  }

  /** Приватный метод проверки ответа сервера */
  _getResponse<T>(res: Response): Promise<T> {
    return res.ok
      ? res.json()
      : Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  // Взаимодействие с сервером -----------------------------------------------
  /** Публичный метод класса Api получения данных ингредиентов */
  getIngredients<T>() {
    return fetch(`${this._server}ingredients`)
      .then<T>((res) => this._getResponse<T>(res))
  };

  /** Публичный метод регистрации пользователя */
  registerUser<T>(user: TRegisterUser) {
    return fetch(`${this._server}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    })
      .then<T>((res) => this._getResponse<T>(res))
  };
  /** Публичный метод логина пользователя */
  loginUser<T>(user: TLoginUser) {
    return fetch(`${this._server}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then<T>((res) => this._getResponse<T>(res));
  }
  /** Публичный метод обновления токена */
  refreshToken<T>(data: string | undefined) {
    return fetch(`${this._server}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "token": data,
      }),
    })
      .then<T>((res) => this._getResponse<T>(res));
  }
  /** Публичный метод выхода пользователя из системы */
  logOut<T>(refreshToken: string | undefined) {
    return fetch(`${this._server}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "token": refreshToken,
      }),
    })
      .then<T>((res) => this._getResponse<T>(res));
  }
  /** Публичный метод восстановления пароля */
  recoverPassword<T>(inputEmail: string) {
    return fetch(`${this._server}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": inputEmail,
      }),
    }).then<T>((res) => this._getResponse<T>(res));
  }
  /** Публичный метод сброса и получения нового пароля */
  resetPassword<T>(inputPassword: string, inputCode: string) {
    return fetch(`${this._server}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "password": inputPassword,
        "token": inputCode,
      }),
    }).then<T>((res) => this._getResponse<T>(res));
  }
};

export const api = new Api(SERVER_URL);
