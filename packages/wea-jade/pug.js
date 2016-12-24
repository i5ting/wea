'use strict'

var pug = require('pug');

const BasePlugin = require('./base')

class PugPlugin extends BasePlugin {
  constructor (base, url) {
    super(base, url)

    this.urlextension = '.jsp'
    this.fileextension = '.jade'
  }
  
  compile (filename, data, opts) {
    let self = this

    return new Promise(function(resolve, reject){
      resolve(pug.renderFile(filename, data))
    })
  }
}

exports.middleware = function (base) { 
  return function (ctx, next) {
    let url = ctx.req.url
    return new PugPlugin(base, url).koa(ctx, next)
  }
}

exports.build = function (base, url, dest) { 
  return new PugPlugin(base, url).build(dest)
}