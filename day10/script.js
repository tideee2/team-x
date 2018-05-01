$(function () {  
    //var socket = io();
    // socket.on('stop control', function(){
    //     $('#mess').text("stop control, waiting");
    //     $('#click').attr('disabled','disabled');
    // });
    // $('#click').click(function(){
    //     socket.emit('count');
    //     console.log('ww');
    // });
    
    $('#todo-text').keypress(function(e){
        if(e.which == 13){
            $.ajax({
                type: "POST",
                url: "/user",
                data: JSON.stringify({userName: userName, userAge: userAge}),
                dataType: "json",
                contentType: "application/json",
                success: function(data){ 
                    console.log(data);
                    },
                });
        }
    });
});

function getTasks(){
    $.ajax({
        type: "POST",
        url: "/api/tasks",
        data: JSON.stringify({id: 1}),
        dataType: "json",
        contentType: "application/json",
        success: function(data){ 
            console.log(data);
            },
        });
}