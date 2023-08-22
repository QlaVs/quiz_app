import { createApp } from 'vue';
import App from './App.vue';
import router from "@/render/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import store from "@/store";
createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
//# sourceMappingURL=main.js.map