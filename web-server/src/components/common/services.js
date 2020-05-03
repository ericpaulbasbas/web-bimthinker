import axios from '../../helpers/http';

export function getModels({ searchKeyword, category }) {
  let query = searchKeyword ? `?search=${searchKeyword}` : (category ? `?category=${category}` : '');
  return axios.get(`/models${query}`);
}

export function download() {
  return axios.get(`/download`, {responseType: 'blob'})
      // .then((res) => {
      //   const fileName = res.headers["x-suggested-filename"];
      //   FileSaver.saveAs(res.data, fileName);
      // }).catch((response) => {
      //   console.error("Problem downloading the file", response);
      // });
}
