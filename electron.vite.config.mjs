import { defineConfig } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/main/main.cjs')
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
          index: resolve(__dirname, './src/preload/preload.cjs')
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
    root: '.',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      },
      outDir: 'out/renderer',
      watch: {
        "buildDelay": 0,
        "include": 'src/**',
        "skipWrite": false
      }
    }
  }
})