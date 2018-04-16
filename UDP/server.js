var udp = require('dgram');

var server = udp.createSocket('udp4');

server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

server.on('message',function(msg,info){
    var date = new Date();
    var strTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  console.log(strTime + ': Data received from client : ' + msg.toString());
  console.log("Received " + msg.length+ " bytes from "+ info.address+ ":" + info.port + "\n");

server.send(msg,info.port,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }

});

});

server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port ' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(2222);

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
