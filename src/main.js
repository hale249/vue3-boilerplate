import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { registerGlobalComponent } from "./utilts/import";

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css"; 
// import "./assets/fonts/segoe-ui.css";
// import "./assets/fonts/coiny-regular.css";
// import "./assets/fonts/svn-poppins.css";



const app = createApp(App);
app.config.productionTip = false;
registerGlobalComponent(app);
app.use(router);
app.use(store).mount("#app");
