import router from "@/render/router";
export var auth = {
    namespaced: true,
    actions: {
        // @ts-ignore
        logout: function (_a) {
            var commit = _a.commit;
            commit('logout');
        }
    },
    mutations: {
        // @ts-ignore
        logout: function (state) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            console.log('redirect to login page');
            router.push("/auth");
        },
    }
};
//# sourceMappingURL=auth.js.map