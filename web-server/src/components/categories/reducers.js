import * as types from './action-types';

const initialState = {
  isLoading: false,
  categories: [],
  error: null,
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      },{
        error: null,
      }, {
        loaded: false
      });
    case types.GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        categories: action.categories
      }, {
        isLoading: action.isLoading
      }, {
        error: null,
      }, {
        loaded: true,
      });
    case types.GET_CATEGORIES_FAIL:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }, {
        error: action.error,
      }, {
        loaded: false
      });
    default:
      return state;
  } 
}
