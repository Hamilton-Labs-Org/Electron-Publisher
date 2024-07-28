import { defineConfig } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/main/main.js')
        }
      },
      watch: {
        "buildDelay": 0,
        "include": 'src/**',
        "skipWrite": false
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/preload/index.ts')
        }
      },
      watch: {
        "buildDelay": 0,
        "include": 'src/**',
        "skipWrite": false
      }
    },
  },
  renderer: {
    root: './src/renderer',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      },
      watch: {
        "buildDelay": 0,
        "include": 'src/**',
        "skipWrite": false
      }
    }
  }
})