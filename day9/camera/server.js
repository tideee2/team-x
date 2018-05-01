var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
var runCamera = false;
var counter=0;
var timeCount = 10;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //console.log(socket);
    if (users.indexOf(socket) == -1){
        users.push(socket);
        //console.log('44');
        if (runCamera){
           // socket.emit('waiting','please wait');
            sendTimeLeft();
        }
        else{
            getCamera();
        }
    }
    
    console.log('a user connected');
    
    socket.on('disconnect', function(){
        
      console.log('user disconnected');
        if(users.indexOf(socket) == 0){
            loseCamera();
        }else{
            users.splice(users.indexOf(socket));
        }
    });
  });
io.on('connection',function(socket){
    socket.on('count',function(){   
       // console.log('++');
        counter++;
        io.sockets.emit('count up',counter)
    });
});
function sendTimeLeft(x=0){
    if (users.length > 1) users[0].emit('waiting',"lose control in " + x + "seconds");
    for(var i = 1; i < users.length; i++){
        users[i].emit('waiting', "Waiting for a " + ((i-1)*timeCount+x) + " seconds");
    }
}
function getCamera(){
    runCamera = true;
    users[0].emit('start control');
    let timeleft = timeCount;
    let timerCamera = setInterval(()=>{
        if (timeleft > 0){
            timeleft--;
            sendTimeLeft(timeleft);
        }
        else {
            clearInterval(timerCamera);
            if (users.length == 1) getCamera()
            else loseCamera();
        }
    },1000);
    
   // setTimeout(loseCamera, 10000);
    //sendTimeLeft();
}
function loseCamera(){
    var temp = users[0];
    users[0].emit('stop control');
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