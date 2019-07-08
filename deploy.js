const {resolve} = require('path');
const {existsSync, mkdirSync} = require('fs');
const {execSync} = require('child_process');
const rimraf = require('rimraf');

function exec(command) {
    execSync(command, {stdio: 'inherit'});
}

function deploy() {
    const dist = resolve('./dist');
    const here = process.cwd();
    if (existsSync(dist))
        rimraf.sync(dist);
    mkdirSync(dist);
    exec('git clone git@github.com:DreadBoy/giraffe.git dist');
    process.chdir(dist);
    exec('git checkout gh-pages');
    process.chdir(here);
    exec('webpack --config webpack/webpack.prod.js --mode production');
    process.chdir(dist);
    exec(`git add . && git commit --allow-empty -m "Deployed at ${new Date().toISOString()} " && git push`);
    process.chdir(here);
    rimraf.sync(dist);
}

deploy();
