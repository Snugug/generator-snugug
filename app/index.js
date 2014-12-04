'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var SnugugGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.pkg.files.shift();
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the neat Snugug generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'subgen',
      message: 'Which generator would you like to run?',
      choices: this.pkg.files
    }];

    this.prompt(prompts, function (props) {
      this.subgen = props.subgen;

      done();
    }.bind(this));
  },

  default: function () {
    this.composeWith('snugug:' + this.subgen, {
      options: {
        'skip-install': this.options['skip-install']
      }
    });
  }
});

module.exports = SnugugGenerator;
