import * as apiServices from './services';
import * as types from './action-types';

export function loginRequest() {
  return { type: types.LOGIN_REQUEST, isLoggingIn: true };
}

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user, isLoggingIn: false };
}

export function loginFail(error) {
  return { type: types.LOGIN_FAIL, error, isLoggingIn: false };
}

export function login(email, password) {
  return function(dispatch) {
    dispatch(loginRequest())

    return apiServices.login(email, password)
      .then(
        res => res.data ? 
          dispatch(loginSuccess(res.data)) : dispatch(loginFail("Incorrect email or password")),
        error => {
          console.log('ERROR: ', error.message);
          return dispatch(loginFail(error.message))
        }
      )
  }
}

export function logout() {
  return { type: types.LOGOUT };
}
