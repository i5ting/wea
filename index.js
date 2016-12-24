var ejs = require('ejs')
var path = require('path');

var http = require('http')
var fs   = require('fs')

opts = {
  status: 200,
  header:{
    'Content-Type': 'text/html'
  }
}
const server = http.createServer((req,res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var url = req.url
  if (url == '' | url == '/') {
    url = 'index'
  }
  console.log(req.url)
  var filename = __dirname + '/a/' + url + '.ejs'
  console.log(filename)
  
  fs.stat(filename, function(err, stats) {
    if (err) {
      console.log(err)
      return
    }
    
    console.log(stats)
    ejs.renderFile(filename, {}, {}, function(err, str){
        // str => Rendered HTML string
      console.log(str)
      res.end(str);
    });
  })
  

});

server.listen(3004)
