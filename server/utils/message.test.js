var expect =require('expect');
var{generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
it('should generate the correct message object',()=>{
    //store res in variable
    //assert from match
    //assert text match
    //assert createdAt is number
    var from='noam';
    var text='hello world';
    var message=generateMessage(from,text)
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
    
})
});

describe('generateLocationMessage',()=>{
    it('should generate the correct location',()=>{
        var lat=33.5363;
        var long=35.339393199999996;
        var from='noam';
        var url=`https://www.google.com/maps?q=${lat},${long}`;
        var message= generateLocationMessage(from,lat,long);
        expect(message).toInclude({from,url});
    })

});