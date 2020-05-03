import * as apiServices from './services';
import * as types from './action-types';
import FileSaver from 'file-saver';

export function getModelsRequest() {
  return { type: types.GET_MODELS_REQUEST, isLoading: true };
}

export function getModelsSuccess(models) {
  return { type: types.GET_MODELS_SUCCESS, models, isLoading: false };
}

export function getModelsFail(error) {
  return { type: types.GET_MODELS_FAIL, error, isLoading: false };
}

export function getModels(search) {
  return function(dispatch) {
    dispatch(getModelsRequest())

    return apiServices.getModels(search)
      .then(
        res => dispatch(getModelsSuccess(res.data)),
        error => {
          console.log('ERROR: ', error);
          return dispatch(getModelsFail(error))
        }
      )
  }
}

export function downloadRequest() {
  return { type: types.DOWNLOAD_REQUEST, isLoading: true };
}

export function downloadSuccess() {
  return { type: types.DOWNLOAD_SUCCESS, isLoading: false };
}

export function downloadFail(error) {
  return { type: types.DOWNLOAD_FAIL, error, isLoading: false };
}

export function download() {
  return function(dispatch) {
    dispatch(downloadRequest())

    return apiServices.download()
      .then(
        res => {
          const fileName = res.headers["x-suggested-filename"];
          FileSaver.saveAs(res.data, fileName);
          return dispatch(downloadSuccess(res.data))
        },
        error => {
          console.log('ERROR: ', error);
          return dispatch(downloadFail(error))
        }
      )
  }
}
