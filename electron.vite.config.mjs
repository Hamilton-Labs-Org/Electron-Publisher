import { defineConfig, bytecodePlugin, externalizeDepsPlugin, resolveConfig } from 'electron-vite'
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
      // lib: {
      //   // Could also be a dictionary or array of multiple entry points
      //   entry: resolve(__dirname, 'index.html'), modules: true,
      //   name: 'win',
      //   // the proper extensions will be added
      //   fileName: 'index.html',
      // },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html' )
        },
        output: {
          manualChunks: false,
          inlineDynamicImports: true,
          entryFileNames: 'index.html'
        },
        plugins: [],
      },
      outDir: 'dist/renderer',
      watch: {
        "buildDelay": 0,
        "include": './renderer.js, ./index.html',
        "skipWrite": false
      },
      resolve: {
        preserveSymlinks: true,
      }
    }
  }
})