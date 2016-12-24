'use strict'
var fs = require('fs')


const Koa = require('koa')

var nunjucks = require('nunjucks')

const app = new Koa()



app.use(require('./src/ejs').middleware(__dirname + '/a'))
app.use(require('./src/pug').middleware(__dirname + '/b'))


app.listen(3004)