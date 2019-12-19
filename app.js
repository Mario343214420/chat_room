var express = require ('express')
var app = express()
var http = require ('http').Server (app)
var io = require ('socket.io') (http)

var users = []
var usersInfo = []

app.use ('/', express.static (__dirname + '/page'))

io.on ('connection', socket => {
  console.log ('connection')
  // 发送消息事件
  socket.on('sendMsg', (data)=> {
    console.log (data)
    socket.broadcast.emit('receiveMsg', {
      name: data.name,
      avt: data.avt,
      msg: data.msg
    });
    socket.emit('receiveMsg', {
      name: data.name,
      avt: data.avt,
      msg: data.msg
    });
  });
})



http.listen (8080, function () {
  console.log ('已监听8080端口')
})
