import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:5000/auth"

export const registerAPICall = async (registerObj) => await axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);

export const loginAPICall = async (email, password) => await axios.post(AUTH_REST_API_BASE_URL + '/login', { email, password });

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

// export const saveUserIntoSession = (usename) => {
//   sessionStorage.setItem("authenticatedUser", usename);
// }

// export const getUserFromSession = () => {
//   const usernameSession = sessionStorage.getItem("authenticatedUser");
//   return usernameSession;
// }

export const logout = () => {
    localStorage.clear()
    sessionStorage.clear();
}