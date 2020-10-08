// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

'use strict';
const chalk = require('chalk');
const gentlyCopy = require('gently-copy');

const filesToCopy = ['chart', '.gitlab-ci.yml', 'Dockerfile', 'server.js'];

// User's local directory
const path = process.env.INIT_CWD;

// Moving files to user's local directory
gentlyCopy(filesToCopy, path);

console.log(chalk.green('You need to add next lines to'), chalk.red("package.json"), chalk.green("in"), chalk.blue("{script}"));
console.log(chalk.white("   \"build\": \"quasar build -m pwa\","));
console.log(chalk.white("   \"start\": \"if-env NODE_ENV=production && npm run start:prod || npm run start:dev\","));
console.log(chalk.white("   \"start:dev\": \"quasar dev -m pwa\","));
console.log(chalk.white("   \"start:prod\": \"node server.js\","));
console.log();
console.log(chalk.green('After this, you need to update your'), chalk.red('quasar.conf.js'), chalk.green('in'), chalk.blue('{devServer}'));
console.log(chalk.white("   port: process.env.PORT || 5000,"));
console.log(chalk.white("   open: true,"));
console.log(chalk.white("   public: process.env.PUBLIC_URL || `localhost:${process.env.PORT || 5000}`"));

