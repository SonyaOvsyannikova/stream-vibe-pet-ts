import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      svgr()
  ],
    resolve: {
        alias: [{
            find: '@/',
            replacement: path.resolve('src') + '/',
        }],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
        @use '@/shared/styles/helpers' as *;
      `,
                silenceDeprecations: ['legacy-js-api'],
            },
            less: {},
            stylus: {},
        },
    },
})
