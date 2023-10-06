import axios from "./axiosInterceptor";
const AUTH_REST_API_BASE_URL = "http://localhost:5000/api/message"

export const createNewMessage = async (message) => {
    try {
        const response = await axios.post(AUTH_REST_API_BASE_URL + "/create-message", { message });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllMessages = async (chatId) => {
    try {
        const response = await axios.get(AUTH_REST_API_BASE_URL + "/get-all-message/" + chatId);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
