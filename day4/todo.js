
// var
//     arr = [
//         {
//             'id':1,
//             'text':'www',
//             'check' : 1
//         },
//         {
//             'id':2,
//             'text':'eee',
//             'check' : 0
//         },
//         {
//             'id':3,
//             'text':'rrr',
//             'check': 1
//         }
//     ];

// var serialObj = JSON.stringify(arr);
// localStorage.setItem("list",serialObj);

// var arr=[];

$(document).ready(function(){
    if (localStorage.getItem("list")==null){
        arr = [];
    }
    else{
       arr = JSON.parse(localStorage.getItem("list"))
    }

    displayToDos(arr);

    $('#checkAll').click(function(){
        $('.todo-el .check-todo').prop('checked', !($('.todo-el .check-todo').prop('checked')));
        $('.todo-el .todo-text').toggleClass('active-todo');

    });
    $(document).on("click",'.check-todo',function(){
        $(this).siblings('.todo-text').toggleClass('active-todo');
        console.log($(this).siblings('.todo-text').attr('id'));
      //  arr[$(this).siblings('.todo-text').attr('id')].check = !(arr[$(this).siblings('.todo-text').attr('id')].check);
    });
    $('#text').focus();
    $('#text').keypress(function(e){
        if(e.which == 13){
            var newEl = {
                id: arr.length,
                text: $(this).val(),
                check: 0
            }
            var len = arr.push(newEl);
            $('<div/>',{
                class: 'todo-el',
                id: len,
                html: '<p><input type="checkbox" name="todos" class="check-todo">'+
                '<span class="todo-text">'+$(this).val()+'</span> '+
                '<span class="delete-button">x</span></p>'
            }).appendTo('#todos');
            var serialObj = JSON.stringify(arr);
            localStorage.setItem("list",serialObj);
        }
    });
    $(document).on('click','.delete-button',function(){
        console.log($(this).parents('.todo-el').attr("id"));
        arr.splice($(this).parents('.todo-el').attr("id"),1);
        $(this).parents('.todo-el').remove();
        var serialObj = JSON.stringify(arr);
        localStorage.setItem("list",serialObj);
    });

    $('#done').click(function(){
        $('.todo-el').hide();
        $('.active-todo').parents('.todo-el').show();
    });
    $('#all').click(function(){
        $('.todo-el').show();
    });
    $('#active').click(function(){
        $('.todo-el').hide();
        $('.todo-text').not('.active-todo').parents('.todo-el').show();
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
            console.log($(this).val());
         
            arr[$(this).parents('.todo-el').attr('id')].text = $(this).val();
            $(this).siblings('.todo-text').show().text($(this).val());
            $(this).remove();
            var serialObj = JSON.stringify(arr);
            localStorage.setItem("list",serialObj);
    }});
});

function displayToDos(arr){
   arr.forEach(function(element,index){
    var actClass= element.check ? "active-todo" : "";
    var q = element.check ? 'checked' : "";
    $('<div/>',{
        class: 'todo-el',
        id : index,
        html: '<p><input type="checkbox" name="todos" class="check-todo" '+q+'>'+
        '<span class="todo-text '+actClass+'">'+element.text+'</span> '+
        '<span class="delete-button">x</span></p>'
    }).appendTo('#todos');
    arr.id = index;
   });
}

