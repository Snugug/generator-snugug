'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _s = require('underscore.string');
var fs = require('fs-extra');
var chalk = require('chalk');

var SnugugGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.path = '.' + this.env.cwd.replace(process.cwd(), '');
    // this.pkg = require(process.cwd() + '/package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Let\'s build a Gulp plugin!'
    ));

    var prompts = [
      {
        type: 'string',
        name: 'name',
        message: 'What\'s your Gulp plugin\'s name?',
      },
      {
        type: 'string',
        name: 'desc',
        message: 'What does your Gulp plugin do?',
      },
      {
        type: 'confirm',
        name: 'index',
        message: 'Is this a project\'s index?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.plugin = props.name;
      this.desc = props.desc;
      this.classy = _s.classify(props.name);
      this.slug = _s.slugify(props.name);

      if (props.index) {
        this.path = './index.js';
      }
      else {
        this.path = this.path + '/' + this.slug + '.js';
      }


      done();
    }.bind(this));
  },

  writing: function () {
    this.template('_plugin.js', this.path);
  }
});

module.exports = SnugugGenerator;
