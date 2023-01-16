import {
    router,
    addRoutes
} from "~/router"
import {
    getToken
} from "~/composables/auth"

import store from "~/store"

import {
    showFullLoading,
    hideFullLoading
} from "~/composables/util"

let hasGetInfo = false

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 显示loading
    showFullLoading()

    // 获取token
    const token = getToken()

    // 没有登录，强制跳转到登录页
    if (!token && to.path != "/login") {
        return next({
            path: "/login"
        })
    }

    // 防止用户重复登录
    if (token && to.path === "/login") {
        return next({
            path: from.path ? from.path : "/"
        })
    }

    let hasNewRoutes = false
    // 如果用户登录了， 则自动调用获取用户信息接口， 并存储到vuex
    if (token && !hasGetInfo) {
        const {
            menus
        } = await store.dispatch("getInfo")

        hasGetInfo = true

        hasNewRoutes = addRoutes(menus)
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + ' - 九月云后台'
    document.title = title

    hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => {
    // 关闭loading
    hideFullLoading()
})