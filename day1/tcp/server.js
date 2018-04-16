var net = require('net');
var port = 2222;
var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        var date = new Date();
        var strTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        console.log(strTime + ':' + " ip: " + socket.remoteAddress + " message: " + data);
        socket.write('Echo');
	    socket.pipe(socket);
    });

    socket.on('close', function() {
        var date = new Date();
        var strTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
 
        console.log(strTime + " ip: " + socket.remoteAddress + " disconnect");
    });
});

server.listen(port, function() {
    console.log('Server listening on : ' + port);
});
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};