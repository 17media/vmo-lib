/* eslint-disable */
import ghpages from 'gh-pages';
import pkgJSON from '../package.json';
import sh from 'sh-exec';
import fs from 'fs';
import path from 'path';

const exportPaths = {
  './package.json': './package.json',
  '.': {
    module: {
      types: './index.d.ts',
      default: './index.js',
    },
    default: {
      types: './index.d.ts',
      default: './index.js',
    },
  },
  './components': {
    module: {
      types: './components/index.d.ts',
      default: './components/index.js',
    },
    default: {
      types: './components/index.d.ts',
      default: './components/index.js',
    },
  },
  './constants': {
    module: {
      types: './constants/index.d.ts',
      default: './constants/index.js',
    },
    default: {
      types: './constants/index.d.ts',
      default: './constants/index.js',
    },
  },
  './hooks': {
    module: {
      types: './hooks/index.d.ts',
      default: './hooks/index.js',
    },
    default: {
      types: './hooks/index.d.ts',
      default: './hooks/index.js',
    },
  },
  './enums': {
    module: {
      types: './enums.d.ts',
      default: './enums.js',
    },
    default: {
      types: './enums.d.ts',
      default: './enums.js',
    },
  },
  './types': {
    module: {
      types: './types.d.ts',
      default: './types.js',
    },
    default: {
      types: './types.d.ts',
      default: './types.js',
    },
  },
  './utils': {
    module: {
      types: './utils.d.ts',
      default: './utils.js',
    },
    default: {
      types: './utils.d.ts',
      default: './utils.js',
    },
  },
};

// ghpages.publish(
//   'out',
//   {
//     branch: 'release/v1.0.0',
//     // add: true,
//     // async beforeAdd(git) {
//     //   return git.rm('./some-outdated-file.txt');
//     // },
//   },
//   () => {},
// );

/* eslint-disable */

// const getDiff = async (...packages: string[]) => {
//   const stdout = await sh`git diff --name-only HEAD~1`;

//   const modifiedPaths = (stdout.match(/^packages\/([^/]+)/gm) || []).map(
//     filePath => filePath.split('/')[1],
//   );

//   const uniqPackages = [...new Set(modifiedPaths)].filter((pkg: string) =>
//     packages.includes(pkg),
//   );

//   return uniqPackages;
// };

(async () => {
  const newPkgJSON = {
    ...pkgJSON,
    // main: 'index.js',
    module: 'vmo.js',
    types: 'vmo.d.ts',
    exports: exportPaths,
    // name: 'vmo-lib-v2',
  };

  // @ts-ignore
  delete newPkgJSON.main;

  // const releaseVersion = `version/${newPkgJSON.version}`;

  const releaseVersion = `version/0.0.1`;

  console.log('Start building ..');

  await sh`
    yarn build:lib
  `;
  // cp yarn.lock ./dist/yarn.lock

  console.log('Generate new package.json ..');

  await fs.writeFileSync(
    path.join(__dirname, '../dist', 'package.json'),
    JSON.stringify(newPkgJSON),
    'utf-8',
  );

  console.log(`Deploy to target branch [${releaseVersion}] ..`);

  await ghpages.publish('dist', {
    branch: releaseVersion,
    history: false,
  });

  // await sh`
  //   gh-pages -b ${releaseVersion} -d dist
  // `;

  // rm -rf dist
})();
