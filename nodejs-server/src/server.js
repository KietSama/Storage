//console.log("server is running");

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){	
	if(request.url == '/about.html')
	{
		response.writeHead(200, {
			//"Context-type" : "text/plain"
			"Context-type" : "text/html"
		});
		
		fs.createReadStream('./about.html').pipe(response);
		
		//response.write('Your URL is ' + request.url);
		
		//response.end();
	}
	else if(request.url == '/index.html')
	{
		response.writeHead(200, {
			"Context-type" : "text/html"
		});
		
		fs.createReadStream('./index.html').pipe(response);
	}
	else
	{
		response.writeHead(404, {
			"Context-type" : "text/plain"
		});
		
		response.write('404 Not Found' + request.url);
		response.end();
	}
});

server.listen(3000, function(){
	console.log('Connected Successfull!');
});







