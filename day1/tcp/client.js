var net = require('net');

var client = new net.Socket();

client.connect(2222, '127.0.0.1', function() {
	console.log('Connected to server');
	client.write('hello hell hel he l o');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy();
});

client.on('close', function() {
	console.log('Connection closed');
});