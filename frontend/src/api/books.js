import axios from "../utils/axiosInstance";

export const getBooks = () => { axios.get("books/") }
export const getBook = (id) => axios.get(`books/${id}/`);
export const addBook = (data, token) =>
    axios.post("books/", data, {
        headers: { Authorization: token },
    });
export const updateBook = (id, data, token) =>
    axios.put(`books/${id}/`, data, {
        headers: { Authorization: token },
    });
export const deleteBook = (id, token) =>
    axios.delete(`books/${id}/`, {
        headers: { Authorization: token },
    });

export const getAuthors = () => axios.get(`books/authors/`);
export const getGenres = () => axios.get(`books/genres/`);