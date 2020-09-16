var http = require('http');
var fs = require('fs');
http.createServer(function(req, res){
    if(req.url==='/snake'){
        res.writeHeader(200, {'content-type':'text/html'});
        fs.readFile('main.html', function(err, file){
            if(err) throw err;
            res.write(file);
            res.end();
        });
    }else if(req.url.indexOf("css") != -1){
        res.writeHeader(200, {'content-type':'text/css'});
        fs.readFile('src/styles.css', function(err, file){
            if(err) throw err;
            res.write(file);
            res.end();
        });
    }else if(req.url.indexOf("js") != -1){
        res.writeHeader(200, {'content-type':'text/javascript'});
        fs.readFile('src/snake.js', function(err, file){
            if(err) throw err;
            res.write(file);
            res.end();
        });
    }else{
        res.writeHeader(404);
        res.end("Page Not Found!");
    }
}).listen(3002);