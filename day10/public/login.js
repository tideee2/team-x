$(function () {
    console.log(11111);
    $('#login-form').hide();
    $('#login-link').click(function(){
        $('#login-form').show();
        $('#register-form').hide();
        $('#login-button').click(function(){
            $.ajax({
                type: "post",
                url: "/api/users",
                data: JSON.stringify({
                    name: $('#name').val(),
                    pass: $('#pass').val()
                }),
                dataType: "json",
                contentType: "application/json",
                success: function(data){
                    console.log(data);
                    if (data.status == 'ok'){
                    $('#message').text('login success').fadeOut(4000);
                    var date = new Date(new Date().getTime() + 3600 * 1000);
                    document.cookie = "name="+data.name+"; path=/; expires=" + date.toUTCString();
                    document.cookie = "id="+data.id+"; path=/; expires=" + date.toUTCString();
                    document.cookie = "status=ok; path=/; expires=" + date.toUTCString();

                    setTimeout(() => {
                        window.location.href = 'list.html';
                    }, 3000); 
                    }
                    else
                    $('#message').text(data.status).fadeOut(4000);
                },
                error:function(){
                    console.log('error');
                    $('#message').text('error login').fadeOut(4000);
                }
            });
            $('#message').text('').show();
        });
    });
    $('#register-form').hide();
    $('#register-link').click(function(){
        $('#register-form').show();
        $('#login-form').hide();

        $('#register-button').click(function(){
           if ($('#reg-pass1').val() != $('#reg-pass2').val()){
               console.log(555);
              $('#message').text('Passwords do not match').show().fadeOut(4000);
           }
           else if ($('#reg-pass1').val()=='' || $('#reg-name').val()==''){
               console.log(333);
              $('#message').text('name or password is empty').show().fadeOut(4000);
           }
           else
           $.ajax({
            type: "post",
            url: "/api/adduser",
            data: JSON.stringify({
                name: $('#reg-name').val(),
                pass: $('#reg-pass1').val()
            }),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                console.log(data);
                if (data.status == 'that user exist'){
                    $('#message').text('that user exist').show().fadeOut(4000);
                }
                if (data.status == 'register ok'){
                    $('#message').text('register ok, please login').show().fadeOut(8000);
                    setTimeout(() => {
                        $('#register-form').hide();
                        $('#login-form').show();
                    }, 7000); 
                }
            },
            error: function(){
                console.log('error');
            }
        });
      
    });
});
});