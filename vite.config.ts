import { defineConfig } from 'vite'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'

const SILENT = process.env.SILENT === 'true'
const SITEMAP_HOST = process.env.SITEMAP_HOST || 'http://localhost:3000/'

const plugins = [
  // https://github.com/vitejs/vite/tree/main/packages/plugin-vue
  Vue({
    include: [/\.vue$/],
  }),

  /**
   * vite-plugin-pages plugin generate routes based on file system
   *
   * @see https://github.com/hannoeru/vite-plugin-pages
   */
  Pages({
    pagesDir: [
      {
        dir: 'src/pages',
        baseRoute: '',
      },
    ],
    onRoutesGenerated: (routes) =>
      generateSitemap({
        routes,
        hostname: SITEMAP_HOST,
      }),
  }),

  /**
   * unplugin-vue-components plugin is responsible of autoloading components
   * documentation and md file are loaded for elements and components sections
   *
   * @see https://github.com/antfu/unplugin-vue-components
   */
  Components({
    directoryAsNamespace: false,
    dirs: ['src/components', 'src/layouts'],
    extensions: ['vue'],
    dts: true,
    include: [/\.vue$/, /\.vue\?vue/],
  }),
//TODO uncomment and setup GA
  // ViteRadar({
  //   enableDev: true,
  //   gtm: {
  //     id: 'GTM-P4BKNDB',
  //   },
  // }),
//TODO turn on pwa in prod
  /**
   * vite-plugin-pwa generate manifest.json and register services worker to enable PWA
   *
   * @see https://github.com/antfu/vite-plugin-pwa
   */
  // VitePWA({
  //   base: '/',
  //   includeAssets: [
  //     'favicon.svg',
  //     'favicon.ico',
  //     'robots.txt',
  //     'apple-touch-icon.png',
  //   ],
  //   manifest: {
  //     name: 'International STEAM Education PTY LTD',
  //     short_name: 'iSTEAMEDU',
  //     start_url: '/?utm_source=pwa',
  //     display: 'standalone',
  //     theme_color: '#ffffff',
  //     background_color: '#ffffff',
  //     icons: [
  //       {
  //         src: 'pwa-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //         purpose: 'any maskable',
  //       },
  //     ],
  //   },
  // }),

]
export default defineConfig({
  // Project root directory (where index.html is located).
  root: process.cwd(),
  // Base public path when served in development or production.
  base: '/',
  // Directory to serve as plain static assets.
  publicDir: 'public',
  // Adjust console output verbosity.
  logLevel: 'info',
  // Will be passed to @rollup/plugin-alias as its entries option.
  resolve: {
    alias: [
      {
        find: '/@src/',
        replacement: `/src/`,
      },
    ],
  },
  optimizeDeps: {
    exclude: ['@vueuse/core', '@vueuse/components'],
    include: [
      'h3',
      'plyr',
      'vue-scrollto',
      'vue-marquee-text-component',
      'cobe',
      'vue3-carousel',
      'vue3-popper',
      'vue-my-photos',
      'vue3-markdown-it',
      'vue-accessible-color-picker',
      'prismjs',
      'vue-prism-component',
      '@iconify/iconify',
    ],
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
