import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";
const app = createApp(App);

app.use(router); // 👈 rất quan trọng, thiếu là router không hoạt động!
app.mount("#app");
