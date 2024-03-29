import { api } from "../../components/utils/Api";
import { setCookie, getCookie } from "../../components/utils/cookies";
import { SERVER_URL } from "../../components/utils/serverUrl";

export const FETCH_REGISTER_REQUEST = 'FETCH_REGISTER_REQUEST';
export const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS';
export const FETCH_REGISTER_FAILED = 'FETCH_REGISTER_FAILED';
export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILED = 'FETCH_LOGIN_FAILED';
export const FETCH_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILED = 'FETCH_TOKEN_FAILED';
export const FETCH_AUTH_USER_REQUEST = 'FETCH_AUTH_USER_REQUEST';
export const FETCH_AUTH_USER_SUCCESS = 'FETCH_AUTH_USER_SUCCESS';
export const FETCH_AUTH_USER_FAILED = 'FETCH_AUTH_USER_FAILED';
export const FETCH_LOGOUT_REQUEST = 'FETCH_LOGOUT_REQUEST';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_LOGOUT_FAILED = 'FETCH_LOGOUT_FAILED';
export const FETCH_PASSWORD_RECOVER_REQUEST = 'FETCH_PASSWORD_RECOVER_REQUEST';
export const FETCH_PASSWORD_RECOVER_SUCCESS = 'FETCH_PASSWORD_RECOVER_SUCCESS';
export const FETCH_PASSWORD_RECOVER_FAILED = 'FETCH_PASSWORD_RECOVER_FAILED';
export const FETCH_PASSWORD_RESET_REQUEST = 'FETCH_PASSWORD_RESET_REQUEST';
export const FETCH_PASSWORD_RESET_SUCCESS = 'FETCH_PASSWORD_RESET_SUCCESS';
export const FETCH_PASSWORD_RESET_FAILED = 'FETCH_PASSWORD_RESET_FAILED';
export const FETCH_EDIT_USER_REQUEST = 'FETCH_EDIT_USER_REQUEST';
export const FETCH_EDIT_USER_SUCCESS = 'FETCH_EDIT_USER_SUCCESS';
export const FETCH_EDIT_USER_FAILED = 'FETCH_EDIT_USER_FAILED';

// ======= ACTION CREATORS =============================================================================
/** action creator начала запроса регистрации */
export function fetchRegisterRequest() {
  return { type: FETCH_REGISTER_REQUEST };
};
/** action creator удачной регистрации */
export function fetchRegisterSuccess(data) {
  return {
    type: FETCH_REGISTER_SUCCESS,
    success: data.success,
    email: data.user.email,
    name: data.user.name,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  };
};
/** action creator ошибки регистрации */
export function fetchRegisterFailed(err) {
  return { type: FETCH_REGISTER_FAILED, error: err.message };
};
/** action creator начала запроса входа */
export function fetchLoginRequest() {
  return { type: FETCH_LOGIN_REQUEST };
};
/** action creator удачного логина */
export function fetchLoginSuccess(data) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    success: data.success,
    email: data.user.email,
    name: data.user.name,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  };
};
/** action creator ошибки входа */
export function fetchLoginFailed(err) {
  return { type: FETCH_LOGIN_FAILED, error: err.message };
};
/** action creator начала обновления токена */
export function fetchTokenRequest() {
  return { type: FETCH_TOKEN_REQUEST };
};
/** action creator удачного обновления токена */
export function fetchTokenSuccess(data) {
  return {
    type: FETCH_TOKEN_SUCCESS,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};
/** action creator ошибки обновления токена */
export function fetchTokenFailed(err) {
  return { type: FETCH_TOKEN_FAILED, error: err.message };
};
/** action creator начала обновления данных пользователя */
export function fetchAuthUserRequest() {
  return { type: FETCH_AUTH_USER_REQUEST };
};
/** action creator удачного обновления данных пользователя */
export function fetchAuthUserSuccess(data) {
  return {
    type: FETCH_AUTH_USER_SUCCESS,
    email: data.user.email,
    name: data.user.name,
    success: data.success,
    isAuthChecked: data.success,
  };
};
/** action creator ошибки обновления данных пользователя */
export function fetchAuthUserFailed(error) {
  return { type: FETCH_AUTH_USER_FAILED, error: error.message };
};
/** action creator начала LogOut */
export function fetchLogOutRequest() {
  return { type: FETCH_LOGOUT_REQUEST };
};
/** action creator удачи LogOut */
export function fetchLogOutSuccess() {
  return {
    type: FETCH_LOGOUT_SUCCESS,
    accessToken: "",
    refreshToken: ""
  };
};
/** action creator ошибки LogOut */
export function fetchLogOutFailed(error) {
  return { type: FETCH_LOGOUT_FAILED, error: error.message };
};
/** action creator начала восстановления пароля */
export function fetchPasswordRecoverRequest() {
  return { type: FETCH_PASSWORD_RECOVER_REQUEST };
};
/** action creator удачного восстановления пароля */
export function fetchPasswordRecoverSuccess(data) {
  return {
    type: FETCH_PASSWORD_RECOVER_SUCCESS,
    success: data.success,
    isPassRecover: data.success,
  };
};
/** action creator ошибки восстановления пароля */
export function fetchPasswordRecoverFailed(error) {
  return { type: FETCH_PASSWORD_RECOVER_FAILED, error: error.message };
};
/** action creator начала сброса пароля */
export function fetchPasswordResetRequest() {
  return { type: FETCH_PASSWORD_RESET_REQUEST };
};
/** action creator удачного сброса пароля */
export function fetchPasswordResetSuccess(data) {
  return {
    type: FETCH_PASSWORD_RESET_SUCCESS,
    success: data.success,
    reset: data.success
  };
};
/** action creator ошибки сброса пароля */
export function fetchPasswordResetFailed(error) {
  return { type: FETCH_PASSWORD_RESET_FAILED, error: error.message };
};
/** action creator начала изменения данных пользователя */
export function fetchEditUserRequest() {
  return { type: FETCH_EDIT_USER_REQUEST };
};
/** action creator удачного изменения данных пользователя */
export function fetchEditUserSuccess(response) {
  return {
    type: FETCH_EDIT_USER_SUCCESS,
    email: response.user.email,
    name: response.user.name,
    success: response.success
  };
};
/** action creator ошибки изменения данных пользователя */
export function fetchEditUserFailed(error) {
  return { type: FETCH_EDIT_USER_FAILED, error: error.message };
};

// ======= ACTIONS ========================================================================================

/** action регистрации пользователя */
export function registerUser(user) {
  return async function (dispatch) {
    dispatch(fetchRegisterRequest());
    try {
      const response = await api.registerUser(user);
      const data = await response;
      setCookie("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });
      dispatch(fetchRegisterSuccess(data));
    } catch (error) {
      dispatch(fetchRegisterFailed(error));
      console.log('Ошибка, не получилось зарегистрировать пользователя', error);
    }
  }
};

/** action логина пользователя */
export function loginUser(user) {
  return async function (dispatch) {
    dispatch(fetchLoginRequest());
    try {
      const response = await api.loginUser(user);
      const data = await response;
      setCookie("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });
      dispatch(fetchLoginSuccess(data));
    } catch (error) {
      dispatch(fetchLoginFailed(error));
      console.log('Ошибка, не получилось войти', error);
    }
  }
};

/** action обновления токена пользователя */
export function updateUserToken(token) {
  return async function (dispatch) {
    dispatch(fetchTokenRequest());
    try {
      const response = await api.refreshToken(token);
      const data = await response;
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });
      setCookie("refreshToken", data.refreshToken);
      dispatch(fetchTokenSuccess(data));
    } catch (error) {
      dispatch(fetchTokenFailed(error));
    }
  }
};

/** action LogOut пользователя */
export function logOut(refreshToken) {
  return async function (dispatch) {
    dispatch(fetchLogOutRequest());
    try {
      const response = await api.logOut(refreshToken);
      setCookie("accessToken", "");
      setCookie("refreshToken", "");
      dispatch(fetchLogOutSuccess());
      console.log('logOut', response.message); //убрать при сдаче
    } catch (error) {
      dispatch(fetchLogOutFailed(error));
    }
  }
};

/** action восстановления пароля */
export function passwordRecover(email) {
  return async function (dispatch) {
    dispatch(fetchPasswordRecoverRequest());
    try {
      const response = await api.recoverPassword(email);
      const data = await response;
      dispatch(fetchPasswordRecoverSuccess(data));
      console.log('passwordRecover', response.message); //убрать при сдаче
    } catch (error) {
      dispatch(fetchPasswordRecoverFailed(error));
    }
  }
};

/** action сброса пароля */
export function passwordReset(inputPassword, inputCode) {
  return async function (dispatch) {
    dispatch(fetchPasswordResetRequest());
    try {
      const response = await api.resetPassword(inputPassword, inputCode);
      const data = await response;
      dispatch(fetchPasswordResetSuccess(data));
      console.log('resetPassword', response.message);
    } catch (error) {
      dispatch(fetchPasswordResetFailed(error));
    }
  }
};

// ---- fetchWithRefresh ----------------------------------------------------------------------
const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};
//универсальная функция запроса на сервер и обновления токена в случае ошибки
export const fetchWithRefresh = async (dispatch, url, options, actionCreators) => {
  const { request, success, failure } = actionCreators;
  dispatch(request());
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    try {
      const response = await fetch(url, options);
      const res = await checkResponse(response);
      dispatch(success(res));
    } catch (error) {
      if (['jwt expired', 'jwt malformed'].includes(error.message)) {
        dispatch(updateUserToken(getCookie('refreshToken')));//рефрешу токен и записываю в куки
        const response = await fetch(url, options); //снова пробую авторизоваться
        // options.headers.authorization = refreshData.accessToken; - не нужен, fetch сам запрашивает актуальный
        const res = await checkResponse(response);
        dispatch(success(res));
      } else {
        dispatch(failure(error));
      }
    }
  }
};


// ---- actions на fetchWithRefresh ----------------------------------------------------------------------

export function editUser(user) {
  return async function (dispatch) {
    return fetchWithRefresh(dispatch, `${SERVER_URL}auth/user`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + getCookie('accessToken'),
        },
        body: JSON.stringify(user),
      },
      {
        request: fetchEditUserRequest,
        success: fetchEditUserSuccess,
        failure: fetchEditUserFailed,
      }
    );
  }
}

/**action обновления данных авторизованного пользователя */
export function updateCurrentUser() {
  return async function (dispatch) {
    return fetchWithRefresh(dispatch, `${SERVER_URL}auth/user`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: "Bearer " + getCookie('accessToken'),
        },
      },
      {
        request: fetchAuthUserRequest,
        success: fetchAuthUserSuccess,
        failure: fetchAuthUserFailed,
      }
    );
  }
};


// АРХИВ УДАЛИТЬ ПОСЛЕ РЕВЬЮ

// /**action обновления данных авторизованного пользователя */
// export function updateCurrentUser() {
//   return async function (dispatch) {
//     dispatch(fetchAuthUserRequest());
//     if (getCookie('accessToken')) {
//       try {
//         const response = await api.checkUser(); //пробую авторизоваться
//         const data = await response;
//         dispatch(fetchAuthUserSuccess(data));
//       } catch (err) {
//         console.log('Обработка ошибки после catch', err);
//         if (['jwt expired', 'jwt malformed'].includes(error.message)) {
//           dispatch(updateUserToken(getCookie('refreshToken')));//рефрешу токен и записываю в куки
//           const response = await api.checkUser(); //снова пробую авторизоваться
//           const data = await response;
//           dispatch(fetchAuthUserSuccess(response));
//         } else {
//           dispatch(fetchAuthUserFailed(err));
//         }
//       }
//     }
//   }
// };
/** старый action обновления данных авторизованного пользователя */
// export function updateCurrentUser() {
//   return async function (dispatch) {
//     dispatch(fetchAuthUserRequest());
//     const accessToken = getCookie('accessToken'); //проверяю куки на токен
//     const refreshToken = getCookie('refreshToken');
//     try {
//       const response = await api.checkUser("Bearer " + accessToken); //пробую авторизоваться
//       const data = await response;
//       dispatch(fetchAuthUserSuccess(data));
//     } catch (error) {
//       dispatch(fetchAuthUserFailed(error));
//       dispatch(updateUserToken(refreshToken)); //рефрешу токен
//     }
//   }
// };

// /**старый action изменения данных пользователя */
// export function editUser(user) {
//   return async function (dispatch) {
//     dispatch(fetchEditUserRequest());
//     if (getCookie('accessToken')) {
//       try {
//         const response = await api.editUserData(user);
//         console.log('editUserData получен', response);
//         const data = await response;
//         dispatch(fetchEditUserSuccess(data));
//       } catch (error) {
//         if (['jwt expired', 'jwt malformed'].includes(error.message)) {
//           dispatch(updateUserToken(getCookie('refreshToken')));//рефрешу токен и записываю в куки
//           const response = await api.editUserData(user); //снова пробую авторизоваться
//           const data = await response;
//           dispatch(fetchEditUserSuccess(data));
//         } else {
//           dispatch(fetchEditUserFailed(error));
//         }
//       }
//     }
//   }
// };
