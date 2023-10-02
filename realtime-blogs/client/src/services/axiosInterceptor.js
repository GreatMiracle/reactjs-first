import axios from "axios";

import { getToken } from "./authService";

// Thêm request interceptor
axios.interceptors.request.use(
    (config) => {
        // Thực hiện các thay đổi trước khi gửi yêu cầu, ví dụ: thêm tiêu đề
        config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
    },
    (error) => {
        // Xử lý lỗi request
        return Promise.reject(error);
    }
);

export default axios;