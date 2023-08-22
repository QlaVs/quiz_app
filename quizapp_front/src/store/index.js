import { createStore } from "vuex";
import { auth } from "./auth";
var store = createStore({
    modules: {
        auth: auth,
    },
});
export default store;
//# sourceMappingURL=index.js.map