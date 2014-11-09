'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

var SnugugGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.path = '.' + this.env.cwd.replace(process.cwd(), '');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'string',
      name: 'name',
      message: 'What\'s your JS library\'s name?',
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.classy = _s.classify(props.name);
      this.slug = _s.slugify(props.name);
      this.camel = _s.camelize(props.name);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_library.js', this.path + '/' + this.slug + '.js');
    },
  }
});

module.exports = SnugugGenerator;
