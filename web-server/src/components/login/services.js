import axios from '../../helpers/http';

export function login(email, password) {
  return axios.post(`/login`, {
    email,
	  password,
  });
}
