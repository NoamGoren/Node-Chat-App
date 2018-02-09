const express = require('express');
const path= require('path');
const http=require('http');
const socketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation')
const {Users}=require('./utils/users');

var app = express();
const publicPath=path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var server =http.createServer(app);
var io= socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection',(socket) => {
console.log('New user connected');

socket.on('join',(params,callback)=>{
  if(!isRealString(params.name)||!isRealString(params.room)){
   return callback('Name and room name are required.');
  }
//Trim and lowercase the name
  params.room = params.room.trim().toLowerCase();
params.name = params.name.trim().toLowerCase();

socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id,params.name,params.room);

io.to(params.room).emit('updateUserList',users.getUserList(params.room));

//socket.leave(parans.room);

//io.emit->io.to(params.room).emit
//socket.broadcast.emit -> socket.broadcast.io.to(params.room)
//socket.emit
socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
callback();

});

//emit-send
//on-listen
//message sockets

//challenge
//socket.emit from Admin text :Welcome to chat app
//socket.broadcast.emit from admin text new user join


socket.on('createMessage',(message,callback)=>{
 var user=users.getUser(socket.id);
 if(user && isRealString(message.text)){
  io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));

 }
callback();
})

socket.on('createLocationMessage',(coords)=>{
  var user=users.getUser(socket.id);
  if(user){
    io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));

  }
});



socket.on('disconnect',()=>{
  var user =users.removeUser(socket.id);
  if(user){
    io.to(user.room).emit('updateUserList',users.getUserList(user.room));
    io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
  }
});
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });

