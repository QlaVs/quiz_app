import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/components/pages/LoginPage.vue";
import MainBodyPage from "@/components/pages/MainBodyPage.vue";
var router = createRouter({
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
                    component: function () { return import("@/components/pages/QuizListPage.vue"); },
                },
                {
                    path: "quiz",
                    name: 'quiz',
                    component: function () { return import("@/components/pages/QuizPage.vue"); },
                }
            ]
        }
    ]
});
router.beforeEach(function (to, from, next) {
    var publicPages = ["/auth"];
    var authRequired = !publicPages.includes(to.path);
    if (localStorage.getItem('token') == null && authRequired) {
        next({ name: 'auth' });
    }
    else {
        next();
    }
});
export default router;
//# sourceMappingURL=router.js.map