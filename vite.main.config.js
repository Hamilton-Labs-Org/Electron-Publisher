import { defineConfig, mergeConfig } from 'vite';
import { getBuildConfig, getBuildDefine, external, esmodule, pluginHotRestart } from './vite.base.config';
import { resolve } from 'path'

// https://vitejs.dev/config
export default defineConfig((env) => {
  /** @type {import('vite').ConfigEnv<'build'>} */
  const forgeEnv = env;
  const { forgeConfigSelf } = forgeEnv;
  const define = getBuildDefine(forgeEnv);
  const config = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry,
        fileName: () => '[name].mjs',
        formats: [esmodule ? 'es' : 'cjs'],
      },
      rollupOptions: {
        input: {
            index: resolve(__dirname, './dist/main/index.cjs')
          },
        external,
      },
    },
    plugins: [pluginHotRestart('restart')],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
  };

  return mergeConfig(getBuildConfig(forgeEnv), config);
});