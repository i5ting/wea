'use strict'

var path = require('path');
var rdl = require('rdl')

var dir = path.join(__dirname, './a')

rdl(dir).then(function(r){

  for (var i in r) {
    var url = r[i]
      console.log(url)
    require('./src/ejs').build(__dirname + '/a', url, __dirname + '/b')
  }

})

