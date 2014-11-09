# generator-snugug [![Build Status](https://secure.travis-ci.org/Snugug/generator-snugug.png?branch=master)](https://travis-ci.org/Snugug/generator-snugug)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-snugug from npm, run:

```bash
npm install -g generator-snugug
```

## Available Generators

**gulp-task**

```bash
yo snugug:gulp-task
```

Will generate a Gulp task into the `tasks` folder and update your `Gulpfile.js` to pull in the new task

**js**

```bash
yo snugug:js
```

Will create a basic JS file that will make itself available as a module export, an AMD export, or a window global, depending on what's available. Basic structure akin to [eq.js](https://github.com/snugug/eq.js) and [a11y.js](https://github.com/IBM-Watson/a11y.js)

## License

MIT
