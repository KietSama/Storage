var mConfig = require('./center.json');
var http = require('http');
var fs = require('fs');

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: mConfig.wsPort, path: '/register' });

var LoginManager = require('./login_mgr.js');
var Utils = require('./utils.js');

wss.on('connection', function(ws){
    console.log("Register!");

    ws.on('message', function incoming(data, flags) {
        console.log('Received: %s', data );

        if(Utils.isJson(data.toString()))
        {
            LoginManager.register(JSON.parse(data.toString()), function(result) {
                    console.log(result);
            });
        }
    });

	ws.on('close', function close(){
		console.log('disconnected')
	});

	ws.on('error', function error(e) {
        console.log('Error: %s', e.message);
	});
});
