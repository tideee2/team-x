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
    "VALUES ('" + request.body.text + "',1,1)";
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