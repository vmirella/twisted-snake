import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./styles/game-theme.css";

createApp(App).use(router).mount("#app");
