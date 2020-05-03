import * as types from './action-types';

const modelInitialState = {
  isLoading: false,
  models: [],
  error: null,
};

export function modelsState(state = modelInitialState, action) {
  switch (action.type) {
    case types.GET_MODELS_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }, {
        error: null,
      });
    case types.GET_MODELS_SUCCESS:
      return Object.assign({}, state, {
        models: action.models
      }, {
        isLoading: action.isLoading
      }, {
        error: null,
      });
    case types.GET_MODELS_FAIL:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }, {
        error: action.error,
      });
    default:
      return state;
  } 
}

const downloadInitialState = {
  isLoading: false,
  error: null,
}

export function downloadState(state = downloadInitialState, action) {
  switch (action.type) {
    case types.DOWNLOAD_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }, {
        error: null,
      });
    case types.DOWNLOAD_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }, {
        error: null,
      });
    case types.DOWNLOAD_FAIL:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }, {
        error: action.error,
      });
    default:
      return state;
  } 
}
