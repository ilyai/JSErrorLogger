
/**
 * Recieve log message sent by JS Error Logger and dump it to console
 */

var http = require('http')
  , fs = require('fs')
  , path = require('path')
  , util = require('util');

http.createServer(function(req, res) {
  var input
    , file = req.url == '/' ? 'demo.html' : path.relative('/', req.url)
    , ext = {
      html: "text/html",
      css: "text/css",
      js: "application/javascript"
    };

  if (req.method === 'GET') {
    fs.exists(file, function(exists) {
      if (exists) {
        res.writeHead(200, {'Content-Type': ext[path.extname(file).slice(1)]});
        console.log(req.method + ' ' + req.url + '\t' + res.statusCode);
        fs.readFile(file, function(err, data) {
          if (err) throw err;
          res.end(data);
        });
      } else {
        res.statusCode = 404;
        console.log(req.method + ' ' + req.url + '\t' + res.statusCode);
        res.end();
      }
    });
  } else {
    req.on('data', function(chunk) {
      input ? (input += chunk) : (input = chunk);
    });
    req.on('end', function() {
      console.log(util.inspect(JSON.parse(input), false, 4));
    });
  }
}).listen(3000, '127.0.0.1');

console.log('Ready on http://127.0.0.1:3000/');
