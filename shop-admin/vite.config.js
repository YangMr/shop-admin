import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入path
import path from "path"

// 引入windicss
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://shopapi.2yuecloud.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [vue(), WindiCSS()],
})