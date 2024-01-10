import { TOrderData } from "../types/types";
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CLOSE_CONNECTION: 'WS_CLOSE_CONNECTION' = 'WS_CLOSE_CONNECTION';

type TWsPayload = {
  orders: TOrderData[],
  total: number,
  totalToday: number,
}

export type TWsConnectionStart = {
  readonly type: typeof WS_CONNECTION_START,
}

export type TWsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS,
}

export type TWsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR,
  payload: string,
}

export type TWsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED,
}

export type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE,
  payload: TWsPayload,
}

export type TWsCloseConnection = {
  readonly type: typeof WS_CLOSE_CONNECTION,
}

export type TWebSocketActions = TWsConnectionStart | TWsConnectionSuccess | TWsConnectionError | TWsConnectionClosed | TWsGetMessage | TWsCloseConnection;
