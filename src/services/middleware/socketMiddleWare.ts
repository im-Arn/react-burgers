import { getCookie } from "../../components/utils/cookies";
import { updateUserToken } from "../actions/user";
import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { AppDispatch } from "../types/types";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CLOSE_CONNECTION
} from "../actions/wsFeed";
import {
  WS_CLOSE_CONNECTION_USER,
  WS_CONNECTION_CLOSED_USER,
  WS_CONNECTION_ERROR_USER,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS_USER,
  WS_GET_MESSAGE_USER
} from "../actions/wsUser";

type TWsActions = {
  wsStart: typeof WS_CONNECTION_START | typeof WS_CONNECTION_START_USER,
  wsClose: typeof WS_CLOSE_CONNECTION | typeof WS_CLOSE_CONNECTION_USER,
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS_USER,
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED_USER,
  onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_ERROR_USER,
  onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_MESSAGE_USER
}

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI<Dispatch<any>, AppDispatch>) => {
    let socket: WebSocket | null = null;
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsStart && payload) {
        socket = new WebSocket(`${wsUrl}?token=${payload}`);
        return socket;
      } else if (type === wsStart) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: onOpen,
            payload: event,
          });
        };

        socket.onerror = (event) => {
          dispatch({
            type: onError,
            payload: event,
          });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (!accessToken && refreshToken) {
            dispatch(updateUserToken(refreshToken));
          }
          if (['Invalid or missing token', 'Token is invalid'].includes(parsedData.message)) {
            dispatch(updateUserToken(refreshToken));
          }

          dispatch({
            type: onMessage,
            payload: parsedData,
          });
        };

        socket.onclose = (event) => {
          dispatch({
            type: onClose,
            payload: event,
          });
        };

        if (type === wsClose) {
          socket.close(1000, "socket close");
        }
      }

      return next(action);
    };
  };
};
