import { getCookie } from "../../components/utils/cookies";
import { fetchWithRefresh } from "./user";
import { SERVER_URL } from "../../components/utils/serverUrl";

export const FETCH_ORDER_REQUEST = "FETCH_ORDER_REQUEST";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAILURE = "FETCH_ORDER_FAILURE";
export const RESET_ORDER_NUMBER = "RESET_ORDER_NUMBER";
/**
 * action creator запроса данных с сервера
 */
export function fetchOrderRequest() {
  return { type: FETCH_ORDER_REQUEST };
}
/**
 * action creator успешного получения данных с сервера
 */
export function fetchOrderSuccess(data) {
  return { type: FETCH_ORDER_SUCCESS, number: data.order.number };
}
/**
 * action creator ошибки получения данных с сервера
 */
export function fetchOrderFailure(error) {
  return { type: FETCH_ORDER_FAILURE, error: error };
}

/**
 * action получения номера заказа с сервера
 */
export function fetchOrder(ingredients) {
  return async function (dispatch) {
    return fetchWithRefresh(dispatch, `${SERVER_URL}orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: "Bearer " + getCookie('accessToken'),
        },
        body: JSON.stringify({
          "ingredients": ingredients,
        })
      },
      {
        request: fetchOrderRequest,
        success: fetchOrderSuccess,
        failure: fetchOrderFailure,
      }
    );
  }
}

/**
 * action очистки номера заказа
 */
export function resetOrderNumber(dataNumber) { //надеюсь вы писали об этом
  return {
    type: RESET_ORDER_NUMBER,
    number: dataNumber
  }
}

// export function fetchOrder(dataArray) {
//   return async function (dispatch) {
//     dispatch(fetchOrderRequest());
//     if (getCookie('accessToken')) {
//       try {
//         const response = await api.getOrderNumber(dataArray);
//         const data = await response.order.number;
//         dispatch(fetchOrderSuccess(data));
//       } catch (error) {
//         if (['jwt expired', 'jwt malformed'].includes(error.message)) {
//           dispatch(updateUserToken(getCookie('refreshToken')));//рефрешу токен и записываю в куки
//           const response = await api.getOrderNumber(dataArray); //снова пробую отослать заказ
//           const data = await response.order.number;
//           dispatch(fetchOrderSuccess(data));
//         } else {
//           dispatch(fetchOrderFailure(error));
//           console.log(error);
//         }
//       }
//     }
//   }
// }
// export function fetchOrder(dataArray) {
//   return async function (dispatch) {
//     dispatch(fetchOrderRequest());
//     if (getCookie('accessToken')) {
//       try {
//         const response = await api.getOrderNumber(dataArray);
//         const data = await response.order.number;
//         dispatch(fetchOrderSuccess(data));
//       } catch (error) {
//         if (['jwt expired', 'jwt malformed'].includes(error.message)) {
//           dispatch(updateUserToken(getCookie('refreshToken')));//рефрешу токен и записываю в куки
//           const response = await api.getOrderNumber(dataArray); //снова пробую отослать заказ
//           const data = await response;
//           dispatch(fetchOrderSuccess(data));
//         } else {
//           dispatch(fetchOrderFailure(error));
//           console.log(error);
//         }
//       }
//     }
//   }
// }
