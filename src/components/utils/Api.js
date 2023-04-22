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
   * Публичный метод отправки массива айди и получения номера заказа с сервера
   */
  getOrderNumber(data) {
    return fetch(`${this._server}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": data,
      })
    })
      .then((res) => this._getResponse(res))
  };
}

export const api = new Api(SERVER_URL);