import {
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILED,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILED,
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_FAILED,
  FETCH_AUTH_USER_REQUEST,
  FETCH_AUTH_USER_SUCCESS,
  FETCH_AUTH_USER_FAILED,
  FETCH_LOGOUT_REQUEST,
  FETCH_LOGOUT_SUCCESS,
  FETCH_LOGOUT_FAILED,
  FETCH_PASSWORD_RECOVER_REQUEST,
  FETCH_PASSWORD_RECOVER_SUCCESS,
  FETCH_PASSWORD_RECOVER_FAILED,
  FETCH_PASSWORD_RESET_REQUEST,
  FETCH_PASSWORD_RESET_SUCCESS,
  FETCH_PASSWORD_RESET_FAILED,
  FETCH_EDIT_USER_REQUEST,
  FETCH_EDIT_USER_SUCCESS,
  FETCH_EDIT_USER_FAILED,
} from "../actions/user";

const initialState = {
  loading: false,
  success: false,
  email: "",
  name: "",
  accessToken: "Bearer ...",
  refreshToken: "",
  error: "",
  isPassRecover: false,
  isAuthChecked: false,
  isPassReset: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        email: action.email,
        name: action.name,
        isAuthChecked: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    }
    case FETCH_REGISTER_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    }
    case FETCH_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        email: action.email,
        name: action.name,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isAuthChecked: true,
      };
    }
    case FETCH_LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    }
    case FETCH_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case FETCH_TOKEN_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case FETCH_AUTH_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_AUTH_USER_SUCCESS: {
      return {
        ...state,
        success: action.success,
        email: action.email,
        name: action.name,
        isAuthChecked: true,
      };
    }
    case FETCH_AUTH_USER_FAILED: {
      return {
        ...state,
        success: false,
        loading: false,
        isAuthChecked: false, //может крашить
      };
    }
    case FETCH_LOGOUT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        isAuthChecked: false
      }
    }
    case FETCH_LOGOUT_FAILED: {
      return {
        ...state,
        success: false,
        loading: false
      }
    }
    case FETCH_PASSWORD_RECOVER_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_PASSWORD_RECOVER_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        isPassRecover: action.success,
      };
    }
    case FETCH_PASSWORD_RECOVER_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        isPassRecover: false,
      };
    }
    case FETCH_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        isPassReset: action.reset
      };
    }
    case FETCH_PASSWORD_RESET_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
      };
    }
    case FETCH_EDIT_USER_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_EDIT_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        email: action.email,
        name: action.name,
        success: action.success
      }
    }
    case FETCH_EDIT_USER_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
      };
    }
    default: return state;
  };
};

