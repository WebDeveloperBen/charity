import { createApp } from "vue"
import { createRouter } from "../src/router"
import "./styles.css"
import App from "./App.vue"

const router = createRouter()

createApp(App).use(router).mount("#app")
