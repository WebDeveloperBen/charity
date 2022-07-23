import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"
import Components from "unplugin-vue-components/vite"

const plugins = [
  Vue({
    include: [/\.vue$/],
  }),
  Pages({
    pagesDir: [
      {
        dir: "src/pages",
        baseRoute: "",
      },
    ],
  }),

  Components({
    directoryAsNamespace: false,
    dirs: ["src/components", "src/layouts"],
    extensions: ["vue"],
    dts: true,
    include: [/\.vue$/, /\.vue\?vue/],
  }),
]
export default defineConfig({
  // Project root directory (where index.html is located).
  root: process.cwd(),
  // Base public path when served in development or production.
  base: "/",
  // Directory to serve as plain static assets.
  publicDir: "public",
  // Adjust console output verbosity.
  logLevel: "info",
  // Will be passed to @rollup/plugin-alias as its entries option.
  optimizeDeps: {
    exclude: ["@vueuse/core", "@vueuse/components"],
  },
  build: {
    chunkSizeWarningLimit: Infinity,

    /**
     * Uncomment this section to build the demo with missing images
     * Don't forget to remove this section when you replaced assets with yours
     */
    rollupOptions: {
      external: [/\/assets\/demo\/.*/],
    },
  },
  plugins,
})
