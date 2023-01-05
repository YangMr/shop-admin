import {
    createStore
} from 'vuex'

import {
    login,
    getinfo
} from "~/api/manager"

import {
    setToken,
    removeToken
} from "~/composables/auth"

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            // 用户信息
            user: {}
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        }
    },
    actions: {
        // 登录方法
        login({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                login(payload).then(response => {
                    setToken(response.token)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取当前用户登录信息
        getInfo({
            commit
        }) {
            return new Promise((resolve, reject) => {
                getinfo().then(response => {
                    commit("SET_USERINFO", response)
                    resolve(response)
                })
            }).catch(error => {
                reject(error)
            })
        },
        //  退出登录
        logout({
            commit
        }) {
            // 移除cookie里面的token
            removeToken()
            // 清除vuex的用户信息
            commit("SET_USERINFO", {})
        }
    }
})

export default store