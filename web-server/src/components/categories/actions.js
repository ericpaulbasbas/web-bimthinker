import * as apiServices from './services';
import * as types from './action-types';

export function getCategoriesRequest() {
  return { type: types.GET_CATEGORIES_REQUEST, isLoading: true };
}

export function getCategoriesSuccess(categories) {
  return { type: types.GET_CATEGORIES_SUCCESS, categories, isLoading: false };
}

export function getCategoriesFail(error) {
  return { type: types.GET_CATEGORIES_FAIL, error, isLoading: false };
}

export function getCategories(search) {
  return function(dispatch) {
    dispatch(getCategoriesRequest())

    return apiServices.getCategories(search)
      .then(
        res => {
          // console.log('RAW CATEGORIES: ', res.data);
          // formatCategories(res.data);
          return dispatch(getCategoriesSuccess(formatCategories(res.data)))
        },
        error => {
          console.log('ERROR: ', error);
          return dispatch(getCategoriesFail(error))
        }
      )
  }
}

function formatCategories(categories) {
  if (!categories) return null;
  let formattedCategories = {
    root: []
  }

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].parent_id.Valid === false) {
      formattedCategories.root.push(categories[i]);
    } else {
      if (formattedCategories[categories[i].parent_id.Int64]) {
        formattedCategories[categories[i].parent_id.Int64].push(categories[i]);
      } else {
        formattedCategories[categories[i].parent_id.Int64] = [];
        formattedCategories[categories[i].parent_id.Int64].push(categories[i]);
      }
    }
  }
  console.log('FORMATTED CATEGORIES: ', formattedCategories);
  return formattedCategories;
}