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



//emit-send
//on-listen
//message sockets
socket.emit('newMessage',{
  from:'Noam',
  text:'hey how are you',
  createdAt:1234
});

socket.on('createMessage',(newMessage)=>{
  console.log('create Message',newMessage);

})




socket.on('disconnect',()=>{
  console.log('disconneted from server');
})
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });

