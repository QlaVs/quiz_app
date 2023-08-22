import { createStore, Store } from "vuex";
import { auth } from "./auth";

const store: Store<any> = createStore({
    modules: {
        auth,

    },
});

export default store;
