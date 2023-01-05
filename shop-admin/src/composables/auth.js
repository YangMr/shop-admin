import {
    useCookies
} from '@vueuse/integrations/useCookies'
const cookie = useCookies()
const TokenKey = "admin-token"

// 设置token
export const setToken = (token) => {
    cookie.set(TokenKey, token)
}
// 获取token
export const getToken = () => {
    return cookie.get(TokenKey)
}
// 删除token
export const removeToken = () => {
    cookie.remove(TokenKey)
}