import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

createApp(App).use(router).mount("#app");

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}
