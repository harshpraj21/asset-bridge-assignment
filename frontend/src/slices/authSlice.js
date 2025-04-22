import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("userToken");
const userFromStorage = localStorage.getItem("user");


const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: tokenFromStorage || null,
        isAuthenticated: !!tokenFromStorage,
        user: userFromStorage ? JSON.parse(userFromStorage) : null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("userToken", action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
        },
    },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;