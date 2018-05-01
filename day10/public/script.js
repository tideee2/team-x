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
    getTasks(1);
    
});

function getTasks(){
    $.ajax({
        type: "post",
        url: "/api/tasks",
        data: JSON.stringify({id:1}),
        dataType: "json",
        contentType: "application/json",
        success: function(data){ 
            data.forEach((item, i)=>{
                let el = '<div class="list-item" data-id='+item.id+'>'+
                '<input type="checkbox" name="ok" id="ok">'+
                '<p class="todo-text">'+item.text+'</p>'+
                '<span class="delete-button">x</span></div>';
                $('#list').append(el);
            })
            //console.log(data.length);
            },
        error: function() {
            console.log('something wrong');
            }
        });
    
}

$(document).on('click','.delete-button',function(){
   // $('#list').toggleClass('red');
    console.log($(this).parents('.list-item').attr('data-id'));
    let elId = $(this).parents('.list-item').attr('data-id');
    let temp = $(this).parents('.list-item');
    $.ajax({
        url: "api/tasks/"+elId,
        contentType: "application/json",
        method: "DELETE",
        success: function(data){ 
            temp.remove();
        },
        error:function(){
            console.log('error');
        }
    });
});

$(document).on('dblclick','.todo-text',function(){
    var
        tempInput = $('<input type="text" class="temp-input"/>').
        attr({
            'value': $(this).text()
        });
    $(this).after(tempInput);
    $(this).hide();
    $(tempInput).focus();
});

$(document).on('keypress', '.temp-input',function(e){
    if(e.which == 13){
        let temp = $(this).parents('.list-item');
        let id = temp.attr('data-id');
        changeTask($(this),id,'',$(this).val(),1)
}});

$(document).on('keypress', '#todo-enter',(e)=>{
    if(e.which == 13){

        console.log($('#todo-enter').val());
        $.ajax({
              url: "api/addtask",
              contentType: "application/json",
              method: "post",
              data: JSON.stringify({
                    text: $('#todo-enter').val()
                }),
                success: function (data) {
                    console.log(data);
                    let el = '<div class="list-item" data-id='+data[0].id+'>'+
                    '<input type="checkbox" name="ok" id="ok">'+
                    '<p class="todo-text">'+data[0].text+'</p>'+
                    '<span class="delete-button">x</span></div>';
                    $('#list').append(el);
                },
                error: ()=>{
                    console.log('error');
                }
        });
    }
});
function changeTask(el,id,status,text,x){
        $.ajax({
          url: "api/tasks",
          contentType: "application/json",
          method: "PUT",
          data: JSON.stringify({
                id: id,
                status: status,
                text: text,
                x : x
                }),
                success: function (data) {
                    el.siblings('.todo-text').text(el.val()).show();
                    el.remove();
                },
                error: ()=>{
                    console.log('error');
                }
    });
}