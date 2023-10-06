import axios from "./axiosInterceptor";
const AUTH_REST_API_BASE_URL = "http://localhost:5000/api/user"

export const getCurrentUser = async () => {
    try {
        // const response = await axios.get(`${AUTH_REST_API_BASE_URL}/api/users/current-user`);
        const response = await axios.get(AUTH_REST_API_BASE_URL + "/current-user");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllUser = async () => {
    try {
        const response = await axios.get(AUTH_REST_API_BASE_URL + "/get-all-users");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
