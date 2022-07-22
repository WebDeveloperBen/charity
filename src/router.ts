import {
    createRouter as createClientRouter,
    createWebHistory,
  } from 'vue-router'
  // TODO look at the syntax of pages-generated || create original vue-router route syntax tree.
  import routes from 'pages-generated'
  
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
  
    return router
  }
  