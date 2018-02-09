const expect =require('expect');

const{Users}=require('./users');

describe('users',()=>{
    var users;

    beforeEach(()=>{
        users=new Users();
        users.users=[{
            id:'1',
            name:'Mike',
            room:'sport'
        },{
            id:'2',
            name:'Jen',
            room:'politic'
        },
        {
            id:'3',
            name:'Moses',
            room:'sport'
        }];
    });
    it('should add new user',()=>{
        var users=new Users();
        var user={
            id:'123',
            name:'Noam',
            room:'Sports'
        };
        var resUser=users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    })

    it('should return names for sport',()=>{
        var userList=users.getUserList('sport');
        expect(userList).toEqual(['Mike','Moses']);
    })
    it('should return names for politic',()=>{
        var userList=users.getUserList('politic');
        expect(userList).toEqual(['Jen']);
    })
    
    it('should remove user',()=>{
        var user=users.removeUser('1');
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);

        
    });
    it('should not remove a user if user not exists',()=>{
        var user=users.removeUser('99');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    it('should return user by id',()=>{
        var userId='2';
        var user=users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    it('should not return user if id not exists',()=>{
        var userId='234';
        var user=users.getUser(userId);
        expect(user).toNotExist();
    })
})