'use strict'

var ejs = require('ejs')

const BasePlugin = require('./base')

class EjsPlugin extends BasePlugin {
  constructor (base, url) {
    super(base, url)
    this.default = true
    this.urlextension = '.html'
    this.fileextension = '.ejs'
  }
  
  compile (filename, data, opts) {
    let self = this
    console.log(filename)
        console.log(data)
    
        console.log(opts)
    return new Promise(function(resolve, reject){
      ejs.renderFile(filename, data, opts, function(err, str){
          // str => Rendered HTML string
        console.log('ejs = ' + str)
        resolve(str)
      });
    })
  }
}


exports.middleware = function (base) { 
  return function (ctx, next) {
    let url = ctx.req.url
    return new EjsPlugin(base, url).koa(ctx, next)
  }
}

exports.build = function (base, url, dest) {
  return new EjsPlugin(base, url).build(dest)
}