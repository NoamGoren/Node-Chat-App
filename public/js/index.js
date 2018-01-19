var socket = io();

socket.on('connect',function() {
console.log('connected to server');
});

socket.on('disconnect',function(){
    console.log('disconneted from server');
});

socket.on('newMessage',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template =jQuery('#message-template').html();
    var html=Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt:formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage',function(message){

    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template =jQuery('#location-template').html();
    var html=Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt:formattedTime
    });
    jQuery('#messages').append(html);
})

var locationButton= jQuery('#send-location');
locationButton.on('click',function() {
if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
}

locationButton.attr('disabled','disabled').text('Sending location..');


navigator.geolocation.getCurrentPosition(function(postion) {
    locationButton.removeAttr('disabled').text('Send location');
socket.emit('createLocationMessage',{
    latitude: postion.coords.latitude,
    longitude: postion.coords.longitude
});
},function(){
    locationButton.removeAttr('disabled').text('Send location');
    
    alert('Unable to fetch location.');
})
});

jQuery('#message-form').on('submit',function(e){
e.preventDefault();

var messageTextbox=jQuery('[name=message]');

socket.emit('createMessage',{
    from:'User',
    text:messageTextbox.val()
},function() {
    messageTextbox.val('')
});
});