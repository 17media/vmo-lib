/* eslint-disable */
import ghpages from 'gh-pages';
import pkgJSON from '../package.json';
import sh from 'sh-exec';
import fs from 'fs';
import path from 'path';

(async () => {
  const newPkgJSON = {
    ...pkgJSON,
    // main: 'index.js',
    module: 'index.js',
    types: 'index.d.ts',
    // name: 'index-lib-v2',
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

  await sh`
    rm -rf dist
  `;

  console.log(`[${releaseVersion}] Published.`);
})();
