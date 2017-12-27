var socket = io();

socket.on('connect',function() {
console.log('connected to server');



socket.emit('createMessage',{
    from:'Itai',
    text:'lets get some beer dude',
    createdAt:124
});
});

socket.on('disconnect',function(){
    console.log('disconneted from server');
});

socket.on('newMessage',function(message){
    console.log('New Message:',message);
})