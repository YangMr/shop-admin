import {
    createRouter,
    createWebHashHistory
} from "vue-router"

import Index from "~/pages/index.vue"
import Login from "~/pages/login.vue"
import NotFound from "~/pages/404.vue"
import Admin from "~/layout/admin.vue"
import GoodList from "~/pages/goods/list.vue"
import CategoryList from "~/pages/category/list.vue"
import SkusList from "~/pages/skus/list.vue"

// 静态路由表 (公有路由表)
const routes = [{
        path: "/",
        name: "admin",
        component: Admin,
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录页'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

// 动态路由表 (私有路由表, 自定义的路由表) 在前端自定义一份路由表， 然后根据当前用户所拥有的菜单数据从自定义路由表匹配除当前用户所需要动态添加的路由
const asyncRoutes = [{
        path: '/',
        component: Index,
        meta: {
            title: '后台首页'
        }
    },
    {
        path: '/goods/list',
        component: GoodList,
        meta: {
            title: '商品管理'
        }
    },
    {
        path: '/category/list',
        component: CategoryList,
        meta: {
            title: '分类管理'
        }
    },
    {
        path: '/skus/list',
        component: SkusList,
        meta: {
            title: '规格管理'
        }
    },
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 动态添加路由的方法
export function addRoutes(menus) {

    // 定义一个变量，用来保存是否添加新的路由
    let hasNewRoutes = false

    // 创建递归方法， 匹配出当前用户所拥有的路由数据
    const findAddRoutesByMenus = (arr) => {
        arr.forEach(m => {
            let item = asyncRoutes.find(o => o.path === m.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute("admin", item)
                hasNewRoutes = true
            }

            if (m.child && m.child.length > 0) {
                findAddRoutesByMenus(m.child)
            }
        });
    }

    findAddRoutesByMenus(menus)

    return hasNewRoutes
}