var socket = io();
let countMsg = 0
function isElementOutViewport (el) {
    if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0]
    const rect = el.getBoundingClientRect()
    console.log(rect.top)
    console.log(window.innerHeight)
    return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight
  }


function scrollToBottom(fullscroll){
    //Selectors
   

    var messages =jQuery('#messages');
    var newMessage =messages.children('li:last-child')
    //Hieghts
    var clientHeight= messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight= newMessage.prev().innerHeight();

    if (clientHeight+scrollTop +newMessageHeight+lastMessageHeight <= scrollHeight) {
        countMsg++;
        const template = jQuery('#newMsg-template').html();
        const html = Mustache.render(template, {
        countMsg
        });
        jQuery('#messages-preview').html(html);
        }

    if( clientHeight+scrollTop +newMessageHeight+lastMessageHeight >= scrollHeight){
       messages.scrollTop(scrollHeight);
    }
    if (fullscroll) {
        messages.scrollTop(scrollHeight)
        countMsg = 0
        // hide the button
        const countbutton = jQuery('#divCheckbox')
        console.log(countbutton)
        countbutton.remove()
      }
}

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
    scrollToBottom();
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
    scrollToBottom();
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