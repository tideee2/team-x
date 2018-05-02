
var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var mysql      = require('mysql');
var app = express();
var tableName = 'tasks';
// создаем парсер для данных в формате json
var jsonParser = bodyParser.json();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'todolist'
 });

 connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Ok!");
});
//  connection.query('SELECT * from '+tableName, function(err, rows, fields) {
//    if (!err)
//      console.log('The solution is: ', rows[0].text);
//    else
//      console.log('Error while performing Query.');
//  });


app.use(express.static(__dirname + "/public"));
app.get('/list',   (request, response)=>{
    console.log(1);
    response.sendFile(__dirname+"/public"+"/list.html")
});
app.get("/", function(request, response){
	response.sendFile(__dirname + "/index.html");
});
app.get("/index.html", function(request, response){
	response.sendFile(__dirname + "/index.html");
});
app.post("/api/users", jsonParser, function(request, response){
    let name = request.body.name;
    let pass = request.body.pass;
    console.log(request.body);
    var query = "SELECT * FROM users WHERE `name`='"+name+"'";
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) {throw err;response.send({status: 'login fail'});}
        console.log(rows.length);
        if (rows.length > 0){
        if (pass == rows[0].password){
            rows[0].status = 'ok';
            response.send(rows[0]);    
        }
        else response.send({status:'incorrect password'});
        }
        else response.send({status: 'user doesnt exist'})
    });
});
app.post("/api/adduser",jsonParser, (request,response)=>{
    let name = request.body.name || 'noname';
    let pass = request.body.pass;
    console.log(request.body);
    var query = "SELECT * FROM users WHERE `name`='"+name+"'";
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) {throw err;response.send({status: 'register fail'});}
        if (rows.length > 0){
            response.send({status: 'that user exist'})
        }
        else{
            var query2 = "INSERT INTO users (name, password) VALUES ('"+name+"','"+pass+"')";
            console.log(query2);
            connection.query(query2, function(err, rows) {
                if (err) {throw err;response.send({status: 'register fail'});}
                console.log(rows);
                response.send({status: 'register ok'});

            });
        }
    });
});
app.post("/api/tasks",jsonParser,(request,response)=>{
    console.log('111');
    console.log((request.body.id));
    var query = "SELECT * FROM `"+tableName+ "` WHERE `owner`="+request.body.id;
    connection.query(query, function(err, rows) {
        if (err) throw err;
        response.send(rows)    
    });
});

app.delete("/api/tasks/:id",(request, response)=>{
    if(!request.params) return response.sendStatus(400);
    let id = request.params.id;
    var query = "DELETE FROM `"+tableName+ "` WHERE `id`="+id;
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) throw err;
        response.send(rows);    
    });
})
app.put("/api/tasks", jsonParser, function(request, response){
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    let id = request.body.id;
    let text = request.body.x==1 ? '`text`="'+request.body.text+'"' : '';
    let status = request.body.x==2 ? '`status`="'+request.body.status+'"': '';
    var query = "UPDATE `"+tableName+ "` SET "+text+status+" WHERE `id`="+id;
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) throw err;
        response.send(rows);    
    });
    //console.log(request.body);
});
app.post("/api/addtask",function(request, response){
    console.log(request.body.text);
    let query = "INSERT INTO `" + tableName + "` (text, status, owner)"+
    " VALUES ('" + request.body.text + "',1,'"+request.body.id+"')";
    console.log(query);
    connection.query(query, function(err, rows) {
        if (err) throw err;
        let query2 = "SELECT * FROM `" + tableName + "` WHERE `id`=" + rows.insertId;
        connection.query(query2, function(err, rows) {
            if (err) throw err;
            response.send(rows);    
        });    
    });
});

app.listen(3000);