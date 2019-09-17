const fs = require('fs');
const pkg = require('../package.json');
const exec = require('./exec');
const superagent = require('superagent');

const newVersion = process.argv[2];
if (!newVersion) {
  throw new Error('usage: `release new_version`');
}

const today = new Date().toISOString().split('T')[0];

const createChangelog = async () => {
  const currentChangelog = fs.readFileSync('./CHANGELOG.md').toString('utf-8');
  const { text: changelog } = await superagent
    .get(
      `https://webtask.it.auth0.com/api/run/wt-hernan-auth0_com-0/oss-changelog.js?webtask_no_cache=1&repo=node-auth0&milestone=v${newVersion}`
    )
    .set('Accept', 'text/markdown');

  fs.writeFileSync(
    './CHANGELOG.md',
    currentChangelog.replace(
      '# Change Log',
      `# Change Log

## [v${newVersion}](https://github.com/auth0/node-auth0/tree/v${newVersion}) (${today})
${changelog}
[Full Changelog](https://github.com/auth0/node-auth0/compare/v${pkg.version}...v${newVersion})`
    )
  );
};

const createDocs = async () => {
  await exec('npm run jsdoc:generate');
  await exec('rm -rf ./docs');
  await exec(`mv out/${pkg.name}/${newVersion}/ ./docs`);
};

(async () => {
  await exec('git checkout master');
  await exec('git pull');
  await exec(`git checkout -b prepare/${newVersion}`);

  const newReadme = fs
    .readFileSync('./README.md')
    .toString()
    .replace(pkg.version, newVersion);

  fs.writeFileSync('./README.md', newReadme);

  fs.writeFileSync('./package.json', JSON.stringify({ ...pkg, version: newVersion }, null, 2));

  await createDocs();
  await createChangelog();
  await exec('git add docs');
  await exec(`git commit -am "Release v${newVersion}"`);
})();
