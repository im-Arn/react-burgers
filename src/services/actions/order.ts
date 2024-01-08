import { getCookie } from "../../components/utils/cookies";
import { AppThunk, TOrderData } from "../types/types";
import { fetchWithRefresh, } from "./user";
import { SERVER_URL } from "../../components/utils/serverUrl";
import { Dispatch } from "redux";

export const FETCH_ORDER_REQUEST: "FETCH_ORDER_REQUEST" = "FETCH_ORDER_REQUEST";
export const FETCH_ORDER_SUCCESS: "FETCH_ORDER_SUCCESS" = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAILURE: "FETCH_ORDER_FAILURE" = "FETCH_ORDER_FAILURE";
export const RESET_ORDER_NUMBER: "RESET_ORDER_NUMBER" = "RESET_ORDER_NUMBER";

type TOrderRequest = {
  readonly type: typeof FETCH_ORDER_REQUEST,
}
type TOrderSuccess = {
  readonly type: typeof FETCH_ORDER_SUCCESS,
  number: number
}
type TOrderFailure = {
  readonly type: typeof FETCH_ORDER_FAILURE,
  error: string
}
type TOrderResetNumber = {
  readonly type: typeof RESET_ORDER_NUMBER,
  number: null
}

//для AppThunk и order reducer ============================
export type TOrderActions = TOrderRequest | TOrderSuccess | TOrderFailure | TOrderResetNumber;

//для функции fetchWithRefresh ============================
type TOrderRequestAction = () => TOrderRequest;
type TOrderSuccessAction = (response: TOrderResponse) => TOrderSuccess;
type TOrderFailureAction = (error: Error) => TOrderFailure;
export type TActionCreatorsOrder = {
  request: TOrderRequestAction,
  success: TOrderSuccessAction,
  failure: TOrderFailureAction,
}

type TOrderResponse = {
  success: boolean,
  order: TOrderData,
}

/** action creator запроса данных с сервера */
export function fetchOrderRequest(): TOrderRequest {
  return { type: FETCH_ORDER_REQUEST };
}
/** action creator успешного получения данных с сервера*/
export function fetchOrderSuccess(data: TOrderResponse): TOrderSuccess {
  return { type: FETCH_ORDER_SUCCESS, number: data.order.number };
}
/** action creator ошибки получения данных с сервера*/
export function fetchOrderFailure(error: Error): TOrderFailure {
  return { type: FETCH_ORDER_FAILURE, error: error.message };
}
/** action очистки номера заказа */
export function resetOrderNumber(dataNumber: null): TOrderResetNumber {
  return {
    type: RESET_ORDER_NUMBER,
    number: dataNumber
  }
}

/** action получения номера заказа с сервера */
export function fetchOrder(ingredients: string[] | null): AppThunk<void> {
  return async function (dispatch: Dispatch) {
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
