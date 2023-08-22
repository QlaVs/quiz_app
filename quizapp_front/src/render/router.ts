import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/components/pages/LoginPage.vue";
import MainBodyPage from "@/components/pages/MainBodyPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/auth',
            name: "auth",
            component: LoginPage
        },
        {
            path: '/',
            name: "main-body",
            component: MainBodyPage,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: "/",
                    name: "index",
                    redirect: "/quiz-list",
                },
                {
                    path: "quiz-list",
                    name: "quiz-list",
                    component: () => import("@/components/pages/QuizListPage.vue"),
                },
                {
                    path: "quiz",
                    name: 'quiz',
                    component: () => import("@/components/pages/QuizPage.vue"),
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/auth"];
    const authRequired = !publicPages.includes(to.path);

    if (localStorage.getItem('token') == null && authRequired) {
        next({name: 'auth'});
    } else {
        next();
    }
});

export default router;