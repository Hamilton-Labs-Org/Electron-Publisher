const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    ignore: [
      /^\/src/,
      /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/,
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Hamilton Labs',
        name: 'Hamilton Labs',
        description: 'Electron Publisher Tutorial'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin','linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  {
    name: '@electron-forge/plugin-vite',
      // Fuses are used to enable/disable various Electron functionality
      // at package time, before code signing the application
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is an alias for `build.lib.entry`
          // in the corresponding file of `config`.
          entry: './src/main/main.mjs',
          config: 'electron.vite.config.mjs'
        },
      {
        entry: './src/preload/preload.mjs',
        config: 'electron.vite.config.mjs'
      },
      ],
      renderer: [
        {
          name: 'Hamilton Labs',
          config: 'electron.vite.config.mjs',
        },
      ],
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: true,
      [FuseV1Options.EnableCookieEncryption]: false,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: false,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'hamilton-labs',
          name: 'Hamilton Labs'
        },
        prerelease: true,
        draft: true
      }
    }
  ]
};
