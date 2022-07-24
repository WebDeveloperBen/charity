import { createApp, markRaw } from "vue"
import { createRouter } from "../src/router"
import "./styles.css"
import App from "./App.vue"
import { createPinia } from "pinia"

const pinia = createPinia()

const router = createRouter()

createApp(App).use(pinia).use(router).mount("#app")
