const http = require('http');
const fs = require('fs');
const MIMETypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
}

function getContentType(request){
    if(request.url){
        let key = request.url.split('.').slice(-1)[0];
        return MIMETypes[key];
    }
    return undefined;
}

http.createServer(function(req, res){
    let filePath = req.url.slice(1);
    try{
        res.writeHeader(200, {'content-type': getContentType(req)});
        fs.readFile(filePath, function(err, file){
            if(err) throw err;
            res.write(file);
            res.end();
        });
    }catch(err){
        res.writeHeader(404);
        res.end("Page Not Found!");
    }
}).listen(3002);