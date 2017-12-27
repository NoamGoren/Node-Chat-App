const express = require('express');
const path= require('path');
const http=require('http');
const socketIO=require('socket.io');

var app = express();
const publicPath=path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var server =http.createServer(app);
var io= socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket) => {
console.log('New user connected');


socket.emit('newMessage',{
  from:'Admin',
  text:'Welcome to chat app!',
  createdAt:new Date().getTime()
});

socket.broadcast.emit('newMessage',{
  from:'Admin',
  text:'New user enter the channel',
  createdAt:new Date().getTime()
});

//emit-send
//on-listen
//message sockets

//challenfe
//socket.emit from Admin text :Welcome to chat app
//socket.broadcast.emit from admin text new user join


socket.on('createMessage',(message)=>{
  console.log('create Message',message);
  io.emit('newMessage',{
    from: message.from,
    text:message.text,
    createdAt:new Date().getTime()
  });

  // socket.broadcast.emit("newMessage",{
  //   from: message.from,
  //   text:message.text,
  //   createdAt:new Date().getTime()
  // });

})

socket.on('disconnect',()=>{
  console.log('disconneted from server');
})
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });

