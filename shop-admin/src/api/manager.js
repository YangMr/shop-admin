import axios from "~/axios"

// 登录接口
export const login = (data = {}) => {
    return axios({
        url: '/admin/login',
        method: 'POST',
        data
    })
    // 另外一种写法
    // return axios.post("/admin/login", {username,password})
}