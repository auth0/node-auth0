const fs = require('fs');
const execSync = require('child_process').execSync;
const library = require('../package.json');

execSync('npm run jsdoc:generate', { stdio: 'inherit' });
if (fs.existsSync('docs')) {
  execSync('rm -r docs', { stdio: 'inherit' });
}
execSync(`mv out/auth0/${library.version}/ docs`, {
  stdio: 'inherit'
});
