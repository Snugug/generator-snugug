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
    var done = this.async(),
        _this = this;

    this.pkg = require('../package.json');

    fs.exists('Gulpfile.js', function (exists) {
      if (exists) {
        fs.readFile('Gulpfile.js', 'utf-8', function (err, data) {
          _this.gulpfile = data;
          _this.gulpverb = 'update';
          _this.gulpcolor = 'yellow';
          done();
        });
      }
      else {
        _this.gulpfile = '\'use strict\';' + '\n\n' +
          '//////////////////////////////' + '\n' +
          '// Node Requires' + '\n' +
          '//////////////////////////////' + '\n' +
          'var gulp = require(\'gulp\');';
        _this.gulpverb = 'create';
        _this.gulpcolor = 'green';
        done();
      }
    });

  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Let\'s build a Gulp task!'
    ));

    var prompts = [
      {
        type: 'string',
        name: 'name',
        message: 'What\'s your Gulp task name?',
      },
      {
        type: 'string',
        name: 'paths',
        message: 'What default paths do you want to run against?'
      },
      {
        type: 'confirm',
        name: 'browserSync',
        message: 'Would you like to include BrowserSync?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      var pathHolder = [];
      var i = 0;
      this.task = props.name;
      // this.runPaths = props.paths.replace(/, /g, ',\n');
      this.classy = _s.classify(props.name);
      this.slug = _s.slugify(props.name);
      this.browserSync = props.browserSync;


      pathHolder = props.paths.split(', ');
      pathHolder.forEach(function (v, k) {
        var text = '\'' + v + '\'';
        if (i !== 0) {
          text = '  ' + text;
        }
        else {
          i++;
        }
        pathHolder[k] = text
      });

      this.runPaths = pathHolder.join(',\n');


      done();
    }.bind(this));
  },

  writing: {
    task: function () {
      this.template('_task.js', 'tasks/' + this.slug + '.js');
    },
    gulpfile: function () {
      if (this.gulpfile.indexOf('require(\'./tasks/' + this.slug + '\')(gulp);') === -1) {
        this.gulpfile += '\n\n' +
          '//////////////////////////////' + '\n' +
          '// ' + this.task + ' Tasks' + '\n' +
          '//////////////////////////////' + '\n' +
          'require(\'./tasks/' + this.slug + '\')(gulp);' + '\n';

        this.writeFileFromString(this.gulpfile, 'Gulpfile.js');
        this.log('   ' + chalk[this.gulpcolor](this.gulpverb) + ' Gulpfile.js');
      }
    }
  }
});

module.exports = SnugugGenerator;
