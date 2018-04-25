var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
    var qq = JSON.parse(msg);

      io.emit('chat message', msg);
      console.log('chat message [', qq.user,']: ', qq.text)
    });
  });
  io.on('connection', function(socket){
    socket.on('user typing', function(msg){
    var qq = JSON.parse(msg);

      io.emit('user typing', msg);
      console.log('user '+ qq.user+' is typing');
    });
    
  });
  io.on('connection', function(socket){
    socket.on('stop typing', function(msg){
      io.emit('stop typing');
      console.log('ccc');
    })
  })
io.on('connection', function(socket){
    socket.on('user connected', function(msg){
        console.log(JSON.parse(msg).user + ' connected');
        io.emit('user connected',msg);
    });
});1
http.listen(3000, function(){
  console.log('listening on *:3000');
});