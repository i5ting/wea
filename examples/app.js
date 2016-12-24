'use strict'

const Koa = require('koa')

const app = new Koa()

app.use(require('wea-ejs').middleware(__dirname + '/a'))
app.use(require('wea-jade').middleware(__dirname + '/b'))


app.listen(3004)