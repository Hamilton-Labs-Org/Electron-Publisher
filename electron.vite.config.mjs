import { defineConfig, bytecodePlugin, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    root: '.',
    build: {
      rollupOptions: {
        input: [
           resolve(__dirname, './src/main/main.mjs')
        ],
        output: {
          format: 'cjs'
        },
        plugins: [externalizeDepsPlugin(), bytecodePlugin()],
      },
      outDir: 'dist/main',
      watch: {
        "buildDelay": 0,
        "include": 'src/**',
        "skipWrite": false
      },
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
          format: 'cjs'
        },
        plugins: [externalizeDepsPlugin({ exclude: ['versions'] }), bytecodePlugin()],
      },
      outDir: 'dist/preload',
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
    root: '.',
    build: {
      rollupOptions: {
        input: {
          entry: resolve(__dirname, './src/renderer/index.html')
        },
        output: {
          format: 'cjs'
        },
        plugins: [externalizeDepsPlugin({ exclude: ['versions'] })],
      },
      lib: {
        name: 'umd',
        entry: './src/renderer/index.html'
      },
      outDir: 'dist/renderer',
      watch: {
        "buildDelay": 0,
        "include": 'src/**',
        "skipWrite": false
      }
    }
  }
})