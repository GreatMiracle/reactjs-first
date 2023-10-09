import axios from "./axiosInterceptor";
// const AUTH_REST_API_BASE_URL = "http://localhost:5000/api/chat"
import { AUTH_REST_API_BASE_URL } from "../common/utilsCommon";
const PATH_API_URL = "/api/chat"


export const createNewChatApi = async (members) => {
    try {
        const response = await axios.post(AUTH_REST_API_BASE_URL + PATH_API_URL + "/create-new-chat", { members });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllChats = async () => {
    try {
        const response = await axios.get(AUTH_REST_API_BASE_URL + PATH_API_URL + "/get-all-chats");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getDetailChatApi = async (id) => {
    try {
        const response = await axios.get(AUTH_REST_API_BASE_URL + PATH_API_URL + "/get-detail-chat/" + id);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const clearChatMessageApi = async (chatId) => {
    try {
        const response = await axios.post(AUTH_REST_API_BASE_URL + PATH_API_URL + "/clear-unread-message/", { chat: chatId });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}