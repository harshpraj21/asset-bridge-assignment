import axios from "../utils/axiosInstance";

export const getreviews = (bookId) => axios.get(`reviews/?book=${bookId}`);
export const addreview = (data, token) =>
    axios.post("reviews/", data, {
        headers: { Authorization: token },
    });
export const deleteBook = (id, token) =>
    axios.delete(`books/${id}/`, {
        headers: { Authorization: token },
    });