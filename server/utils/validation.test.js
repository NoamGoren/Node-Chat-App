const expect=require('expect');
var{isRealString}=require('./validation');
//import isRealString
describe('isRealString',()=>{
    it('should reject non-string values (pass numbers or symbols)',()=>{
        var str=isRealString(12345);
        expect(str).toBe(false);
    })
    it('should reject string with only spaces',()=>{
        var str=isRealString('      ');
        expect(str).toBe(false);
    })
    it('should allow string with non-space characters',()=>{
        var str=isRealString('    hello    ');
        expect(str).toBe(true);
    })
    });
//isRealString
    //should reject non-string values (pass numbers or symbols)
    // should reject string with only spaces
    //should allow string with non-space characters