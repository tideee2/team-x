var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
var runCamera = false;
var counter=0;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log(socket.id);
    if (users.indexOf(socket.id) == -1){
        users.push(socket.id);
        console.log('44');
        if (runCamera){
            socket.emit('waiting','please wait')
        }
        else{
            getCamera();
        }
    }
    
    console.log('a user connected');
    
    socket.on('disconnect', function(){
        
      console.log('user disconnected');
        if(users.indexOf(socket.id) == 0){
            loseCamera();
        }else{
            users.splice(users.indexOf(socket.id));
        }
    });
  });
io.on('connection',function(socket){
    socket.on('count',function(){   
        console.log('++');
        counter++;
        io.sockets.emit('count up',counter)
    });
});
function getCamera(){
    runCamera = true;
    io.to(users[0]).emit('start control');
    setTimeout(loseCamera, 10000);
    for(var i = 1; i < users.length; i++){
        io.to(users[i]).emit('waiting', "Waiting for a " + i*10 + " seconds");
    }
}
function loseCamera(){
    var temp = users[0];
    io.to(users[0]).emit('stop control');
    users.shift();
    if(users.length != 0){
        getCamera();
    }else{
        runCamera = false;
    }
    users.push(temp);
}
http.listen(3000, function(){
  console.log('listening on *:3000');
});