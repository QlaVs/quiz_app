import router from "@/render/router";

export const auth = {
    namespaced: true,
    actions: {
        // @ts-ignore
        logout({ commit }) {
            commit('logout');
        }
    },
    mutations: {
        // @ts-ignore
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            console.log('redirect to login page');
            router.push("/auth");
        },
    }
}
