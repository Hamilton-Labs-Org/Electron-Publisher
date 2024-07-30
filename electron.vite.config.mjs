import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    root: '.',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/main/main.mjs')
        }
      },
      plugins: [externalizeDepsPlugin()],
      watch: {
        "buildDelay": 0,
        "include": 'src/**',
        "skipWrite": false
      }
    }
  },
  preload: {
    root: '.',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/preload/preload.mjs')
        },
        output: {
          manualChunks(id) {
            if (id.includes('versions')) {
              return 'versions'
            }
          }
        },
        plugins: [externalizeDepsPlugin({ exclude: ['versions'] })],
      },
      watch: {
        "buildDelay": 0,
        "include": 'src/**',
        "skipWrite": false
      }
    },
    optimizeDeps: {
      exclude: ['versions'],
    },
  },
  renderer: {
    
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/renderer/index.html')
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