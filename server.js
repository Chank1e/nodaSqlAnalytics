var express = require("express");
var app = express();
var mysql      = require('mysql');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'chank1e',
  password : '123456',
  database : 'auto'
});

connection.connect();
var data;
/*connection.query('SELECT * from `cars` ', function (error, results, fields) {
  if (error) throw error;
  data=results;
});*/



io.on('connection', function(socket){
    io.emit('answer',data);
});
/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    res.sendfile( __dirname + req.params[0]);
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
