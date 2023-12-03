import { getCookie } from "../../components/utils/cookies";
import { updateUserToken } from "../actions/user";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
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
          console.log(`Middleware соединение ${wsUrl} установлено`);
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
          if (['Invalid or missing token', 'Invalid token'].includes(parsedData.message)) {
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
