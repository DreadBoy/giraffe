const {resolve} = require('path');
const {emptyDirSync, copySync, removeSync} = require('fs-extra');
const {execSync} = require('child_process');

function exec(command) {
    execSync(command, {stdio: 'inherit'});
}

function deploy() {
    const deploy = resolve('./deploy');
    const build = resolve('./build');
    const here = process.cwd();

    emptyDirSync(deploy);
    exec(`git clone git@github.com:DreadBoy/giraffe.git ${deploy}`);
    process.chdir(deploy);
    exec('git checkout gh-pages');
    removeSync(`${deploy}/!(.git)`)
    process.chdir(here);

    exec('yarn run build');

    copySync(build, deploy)
    process.chdir(deploy);
    exec(`git add . && git commit --allow-empty -m "Deployed at ${new Date().toISOString()} " && git push`);
    process.chdir(here);

    removeSync(deploy);
    removeSync(build);
}

deploy();
