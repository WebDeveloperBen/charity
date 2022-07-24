import { createRouter as createClientRouter, createWebHistory } from "vue-router"
// TODO look at the syntax of pages-generated || create original vue-router route syntax tree.
import { useAuthStore } from "./stores/authStore"
import index from "./pages/index.vue"
import auth from "./pages/auth.vue"
import dashboard from "./pages/dashboard.vue"

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/auth",
    name: "auth",
    component: auth,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: {
      requiresAuth: true,
    },
  },
]

export function createRouter() {
  const router = createClientRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    scrollBehavior() {
      // always scroll to top
      return { top: 0 }
    },
    history: createWebHistory(),
    routes,
  })

  // navigation guards
  router.beforeEach(async (to) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.user.id) return { name: "auth" }

    if (authStore.user.id && to.name === "auth") {
      return false
    }
  })

  return router
}
