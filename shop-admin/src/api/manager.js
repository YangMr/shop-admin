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

// 用户信息接口
export const getinfo = (data = {}) => {
    return axios({
        url: '/admin/getinfo',
        method: 'POST',
        data
    })
}

// 退出登录接口
export const logout = () => {
    return axios({
        url: '/admin/logout',
        method: 'POST'
    })
}

// 修改密码接口
export const updatepassword = (data = {}) => {
    return axios({
        url: '/admin/updatepassword',
        method: 'POST',
        data
    })
}