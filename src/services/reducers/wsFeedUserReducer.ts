import { TOrderData } from "../types/types";
import {
  WS_CONNECTION_CLOSED_USER,
  WS_CONNECTION_ERROR_USER,
  WS_CONNECTION_SUCCESS_USER,
  WS_GET_MESSAGE_USER
} from "../actions/wsUser";
import { TWebSocketUserActions } from "../actions/wsUser";

type TWebSocketFeedUserState = {
  wsConnected: boolean,
  orders: TOrderData[],
}

const initialState: TWebSocketFeedUserState = {
  wsConnected: false,
  orders: [],
};

export const wsFeedUser = (state = initialState, action: TWebSocketUserActions): TWebSocketFeedUserState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_USER: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR_USER: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED_USER: {
      return {
        ...state,
        wsConnected: false,
        orders: initialState.orders
      };
    }
    case WS_GET_MESSAGE_USER: {
      const orders = action.payload.orders.reverse()
      return {
        ...state,
        orders: orders
      };
    }
    default: return state;
  }
}
