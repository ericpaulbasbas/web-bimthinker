import axios from '../../helpers/http';

export function getCategories() {
  return axios.get(`/categories`);
}
