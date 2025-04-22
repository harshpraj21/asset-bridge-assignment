const BASE_URL = "http://localhost:8000/";

export const API = {
  login: `${BASE_URL}api/user/token/`,
  register: `${BASE_URL}api/user/create/`,
  me: `${BASE_URL}api/user/me/`,
  books: `${BASE_URL}api/books/`,
  reviews: `${BASE_URL}api/reviews/`,
};
