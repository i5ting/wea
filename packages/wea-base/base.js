'use strict'

var fs = require('fs')

module.exports = class BasePlugin {
  constructor (base, url) {
    this.base = base
    var url = url
    if (url == '' | url == '/') {
      // url = 'index'
    }
    
    try {
      var stats = fs.statSync(this.base + url)
      console.log(stats)

      if (stats.isDirectory()) {
          url = url + "/index"
      }
    } catch (error) {
      
    }
    
    this.url = url
    this.default = false
    // this.filename = path
    this.data = {}
    this.opts = {}    
  }

  koa (ctx, next) {
    this.ctx = ctx
    this.next = next
    
    var arr = this.url.split('.')
  
    var extension  = arr.length > 1 ? arr.pop() : 'default'
    this.prefix = arr.join('.').replace('//','/')

    console.log(this.prefix)
    console.log(extension)
    let self = this
    return this.check(extension)
      .then(this.render.bind(this))
  }
  
  build (destdir) {    
    console.log(destdir)
    var arr = this.url.split('.')
  
    var extension  = arr.length > 1 ? arr.pop() : 'default'
    this.prefix = arr.join('.').replace('//','/')

    console.log(this.prefix)
    console.log(extension)
    
    console.log('dest urlextension = ' + this.prefix + this.urlextension)
    console.log('dest fileextension = ' + this.prefix + this.fileextension)
    let self = this
    
    self.filename = this.prefix + this.fileextension
    console.log('filename=' + self.filename)
    return self.compile(self.filename, self.data, self.opts).then(function(str){
      console.log(destdir + self.prefix.replace(self.base, '') + self.urlextension)
      if (str) {
        fs.writeFileSync(destdir + self.prefix.replace(self.base, '') + self.urlextension, str)
      } 
      return Promise.resolve()
    })
  }

  check (extension) {
    this.isOk = false
    var arr = [this.urlextension]
    if (this.default === true){
      arr.push('default')
    }
    this.urlextension = arr
    
    for(var i in this.urlextension){
      let u = this.urlextension[i]
      if (extension === u) {
        this.isOk = true
        break
      }
      if (extension === u.replace('.', '')){
        this.isOk = true
        break
      }
    }
    return Promise.resolve()
  }

  render(){
    let self = this
    if (!this.isOk){
      // 不匹配文件后缀，直接放过
      return this.next()
    }
    this.fileextension = [this.fileextension]
    for(var i in this.fileextension){
      var filename = this.base + (this.prefix + this.fileextension[i])
      if (fs.existsSync(filename)) {
        self.filename = filename
        break
      }
    }
    // console.log(self.filename)
    return self.compile(self.filename, self.data, self.opts).then(function(str){
      if (str) {
        return self.ctx.body = str
      } 
    })
  }
}