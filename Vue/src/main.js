import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App).use(router).use(createPinia());

router.isReady().then(() => {
  app.mount("#app");
});
