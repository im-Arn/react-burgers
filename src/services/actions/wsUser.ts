import { TOrderData } from "../types/types";
export const WS_CONNECTION_START_USER: 'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS_USER: 'WS_CONNECTION_SUCCESS_USER' = 'WS_CONNECTION_SUCCESS_USER';
export const WS_CONNECTION_ERROR_USER: 'WS_CONNECTION_ERROR_USER' = 'WS_CONNECTION_ERROR_USER';
export const WS_CONNECTION_CLOSED_USER: 'WS_CONNECTION_CLOSED_USER' = 'WS_CONNECTION_CLOSED_USER';
export const WS_GET_MESSAGE_USER: 'WS_GET_MESSAGE_USER' = 'WS_GET_MESSAGE_USER';
export const WS_CLOSE_CONNECTION_USER: 'WS_CLOSE_CONNECTION_USER' = 'WS_CLOSE_CONNECTION_USER';

type TWsUserPayload = {
  orders: TOrderData[],
  total: number,
  totalToday: number,
}

export type TWsConnectionUserStart = {
  readonly type: typeof WS_CONNECTION_START_USER,
}
export type TWsConnectionUserSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS_USER,
}
export type TWsConnectionUserError = {
  readonly type: typeof WS_CONNECTION_ERROR_USER,
}
export type TWsConnectionUserEClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED_USER,
}
export type TWsGetMessageUser = {
  readonly type: typeof WS_GET_MESSAGE_USER,
  payload: TWsUserPayload,
}
export type TWsUserCloseConnection = {
  readonly type: typeof WS_CLOSE_CONNECTION_USER,
}

export type TWebSocketUserActions = TWsConnectionUserStart | TWsConnectionUserSuccess | TWsConnectionUserError
 | TWsConnectionUserEClosed | TWsGetMessageUser | TWsUserCloseConnection;
