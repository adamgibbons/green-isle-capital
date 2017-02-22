var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var less        = require('metalsmith-less');
var watch       = require('metalsmith-watch');

Metalsmith(__dirname)
  // .metadata({
  //   title: "My Static Site & Blog",
  //   description: "It's about saying »Hello« to the World.",
  //   generator: "Metalsmith",
  //   url: "http://www.metalsmith.io/"
  // })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(permalinks())
  .use(less())
  .use(layouts({
    engine: 'pug'
  }))
  .use(
    watch({
      paths: {
       "${source}/**/*": true,
        "layouts/**/*": "**/*.md",
      },
      livereload: true
    })
  )
  .build(function(err, files) {
    if (err) { throw err; }
  });
