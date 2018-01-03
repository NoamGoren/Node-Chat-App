const express = require('express');
const path= require('path');
const http=require('http');
const socketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message');
var app = express();
const publicPath=path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var server =http.createServer(app);
var io= socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket) => {
console.log('New user connected');


socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

socket.broadcast.emit('newMessage',generateMessage('Admin','New user joind!'));

//emit-send
//on-listen
//message sockets

//challenge
//socket.emit from Admin text :Welcome to chat app
//socket.broadcast.emit from admin text new user join


socket.on('createMessage',(message,callback)=>{
  console.log('create Message',message);
  io.emit('newMessage',generateMessage(message.from,message.text));
callback();
})

socket.on('createLocationMessage',(coords)=>{
  io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
});



socket.on('disconnect',()=>{
  console.log('disconneted from server');
})
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });

