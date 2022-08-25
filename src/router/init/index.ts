import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

declare module 'vue-router' {
    interface RouteMeta {
    }

    interface _RouteRecordBase {
    }
}

export const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     redirect: '/Main'
    // },
    {
        path: '/permission',
        name: 'permission',
        component: () => import('../../views/permission/index.vue')
    },
    {
        path: '/role',
        name: 'role',
        component: () => import('../../views/role/index.vue')
    },
    {
        path: '/emp',
        name: 'emp',
        component: () => import('../../views/emp/index.vue')
    }


]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {

    }
})

export default router


