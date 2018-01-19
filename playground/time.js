//jan 1st 1970 00:00:00 am
//moment libary for time

// var date = new Date();
// var months =['Jan','Feb']
// console.log(date.getMonth());

var moment =require('moment');

// var date= moment();
// console.log(date.format('MMM Do, YYYY'));
// console.log(date.format('h:mm a'));

//10:35 am
//6:01 am
 var someTimestamp= moment().valueOf();
 console.log(someTimestamp);


var createdAt=1234;
var date= moment(createdAt);
console.log(date.format('h:mm a'))