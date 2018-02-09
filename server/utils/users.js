[{
    id:'5465hfgh5',
    name:'Noam',
    room:'Sports'
}]

//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)


class Users{
    constructor(){
        this.users =[];
    }
    addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
    };

    removeUser(id){
        //return user that was removed
        var user =this.getUser(id);
        if(user){
        this.users=this.users.filter((user)=> user.id!==id);
        }
        return user;
    }
    getUser(id){
       return this.users.filter((user) => user.id == id)[0];
    }
    getUserList(room){
        var users=this.users.filter((user)=>user.room===room);
        var namesArray=users.map((user)=>user.name);

        return namesArray;
    }
}

module.exports={Users};
//new way ES6
// class Person {
// constructor (name,age){
// this.name=name;
// this.age=age;
// }
// getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old`
// }
// }
// var me=new Person('Noam',25);
// var description =me.getUserDescription();
// console.log(description);






//old way
// var users=[];
// var addUser=(id,name,room) =>{
//     user.push({})
// }
// modules.export={addUsers}


