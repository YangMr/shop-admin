import axios from "axios"

// 引入消息提示方法
import {
    toast
} from "~/composables/util.js";

// 引入cookie工具库
import {
    getToken
} from "~/composables/auth.js"


const service = axios.create({
    baseURL: '/api'
})

// 请求拦截器
service.interceptors.request.use(function (config) {

    // 往header请求头自动添加token
    const token = getToken()
    if (token) {
        config.headers['token'] = token
    }

    return config;
}, function (error) {

    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(function (response) {
    return response.data.data;
}, function (error) {

    // 请求失败错误信息提示;
    toast(error.response.data.msg || "请求失败", "error")

    return Promise.reject(error);
});

export default service