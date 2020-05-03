import * as types from './action-types';

const initialState = {
  isLoggingIn: false,
  user: {},
  error: null,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: action.isLoggingIn
      }, {
        error: null,
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      }, {
        isLoggingIn: action.isLoggingIn
      }, {
        token: action.user.user_id,
      }, {
        error: null,
      });
    case types.LOGIN_FAIL:
      return Object.assign({}, state, {
        user: {},
      }, {
        isLoggingIn: action.isLoggingIn
      }, {
        token: null,
      }, {
        error: action.error,
      });
    case types.LOGOUT:
      return Object.assign({}, state, {
        user: {},
      }, {
        isLoggingIn: false
      }, {
        token: null,
      }, {
        error: null,
      });
    default:
      return state;
  } 
}

export const getProducts = state => state.models;
