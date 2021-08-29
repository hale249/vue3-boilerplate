import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { registerGlobalComponent } from "./utilts/import";


const app = createApp(App);
app.config.productionTip = false;
registerGlobalComponent(app);
app.use(router);
app.use(store).mount("#app");
