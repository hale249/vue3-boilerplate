import { createWebHistory, createRouter } from "vue-router";
import Home from '../pages/home/index.vue';
import About from '../pages/home/about.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            layout: 'auth',
        },
        component: About,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;