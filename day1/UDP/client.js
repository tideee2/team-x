var udp = require('dgram');
var buffer = require('buffer');

var client = udp.createSocket('udp4');

var data = Buffer.from('privet, pacani');

client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log("Received " + msg.length+ " bytes from "+ info.address+ ":" + info.port + "\n");
  client.close();
});

client.send(data,2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});

