const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
<<<<<<< HEAD
    // set config executableName
    productName: "Hamilton Labs",
    asar: true,
    icon: './assets/images/icon',
=======
    asar: true,
    icon: './assets/images/icon.ico',
>>>>>>> upstream/main
    darwinDarkModeSupport: true,
    // ignore: [
    //   /^\/src/,
    //   /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/,
    // ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Hamilton Labs',
        name: 'HamiltonLabs',
        description: 'Electron Publisher Tutorial',
        icon: './assets/images/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        manufacturer: 'Hamilton Labs'
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'Hamilton Labs Installer',
        icon: './assets/images/icon.icns',
        'icon-size': 100,
        background: './assets/images/Installer-bg.png',
        format: 'ULFO',
        overwrite: true,
        DMGContents: {
          x: 620,
          y: 150,
          type: 'position',
          path: 'out/Hamilton Labs-darwin-x64/Hamilton Labs.app'
        },
      },
    },
    // {
    //   name: '@electron-forge/maker-zip',
    //   platforms: ['darwin','linux'],
    // },
    {
      name: '@electron-forge/maker-deb',
<<<<<<< HEAD
      // set config executableName
      config: {
        options: {
          icon: './assets/images/icon.png',
          name: 'hamilton-labs',
          productName: 'Hamilton Labs'
      },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      // set config executableName
      config: {
        options: {
          icon: './assets/images/icon.png',
          name: 'hamilton-labs',
          productName: 'Hamilton Labs'
      },
      },
=======
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
>>>>>>> upstream/main
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'hamilton-labs',
          name: 'Electron-Publisher'
        },
        prerelease: true,
        draft: true
      }
    }
  ]
};
