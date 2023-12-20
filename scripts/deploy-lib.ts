/* eslint-disable */
import ghpages from 'gh-pages';
import pkgJSON from '../package.json';
import sh from 'sh-exec';
import fs from 'fs';
import path from 'path';

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
    name: 'vmo-lib-v2',
  };

  // @ts-ignore
  delete newPkgJSON.main;

  const releaseVersion = `version/${newPkgJSON.version}`;

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
