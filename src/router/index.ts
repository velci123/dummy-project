import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/views/Home.vue'),
        name: "Dummy"
    },
    {
        path: '/contact-us',
        component: () => import('@/views/ContactUs.vue'),
        name: "ContactUs"
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router