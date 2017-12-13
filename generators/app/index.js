'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the fantastic ' + chalk.red('generator-commitlint') + ' generator!'
      )
    );
  }

  writing() {
    this.writingConfig();
    this.writingPackage();
  }

  install() {
    this.yarnInstall(
      ['commitlint', '@commitlint/cli', '@commitlint/config-conventional', 'husky'],
      { dev: true }
    );
  }

  writingPackage() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const newPkg = require('./templates/package.json');
    _.merge(pkg, newPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  writingConfig() {
    this.fs.copy(
      this.templatePath('commitlint.config.js'),
      this.destinationPath('commitlint.config.js')
    );
  }
};
