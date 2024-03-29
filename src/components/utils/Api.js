import { SERVER_URL } from "../utils/serverUrl";

class Api {
  constructor(server) {
    this._server = server;
  }

  /**
   * Приватный метод проверки ответа сервера
   */
  _getResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  // Взаимодействие с сервером -----------------------------------------------
  /**
   * Публичный метод класса Api получения данных ингредиентов
   */
  getIngredients() {
    return fetch(`${this._server}ingredients`)
      .then((res) => this._getResponse(res))
  };

  /**
   * Публичный метод регистрации пользователя
   */
  registerUser(user) {
    return fetch(`${this._server}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    })
      .then((res) => this._getResponse(res))
  };
  /**
   * Публичный метод логина пользователя
   */
  loginUser(user) {
    return fetch(`${this._server}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => this._getResponse(res));
  }
  /**
   * Публичный метод обновления токена
   */
  refreshToken(data) {
    return fetch(`${this._server}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "token": data,
      }),
    })
      .then((res) => this._getResponse(res));
  }
  /**
   * Публичный метод выхода пользователя из системы
   */
  logOut(refreshToken) {
    return fetch(`${this._server}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "token": refreshToken,
      }),
    })
      .then((res) => this._getResponse(res));
  }
  /**
   * Публичный метод восстановления пароля
   */
  recoverPassword(inputEmail) {
    return fetch(`${this._server}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": inputEmail,
      }),
    }).then((res) => this._getResponse(res));
  }
  /**
   * Публичный метод сброса и получения нового пароля
   */
  resetPassword(inputPassword, inputCode) {
    return fetch(`${this._server}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "password": inputPassword,
        "token": inputCode,
      }),
    }).then((res) => this._getResponse(res));
  }
};

export const api = new Api(SERVER_URL);
