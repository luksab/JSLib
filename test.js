var a = new jsLib.fraq(2,7);
var b = new jsLib.fraq(3,2);
var c = a.m(b);
console.log(a+" * "+b+" = "+c);
console.log(a+" + "+b+" = "+a.add(b));
console.log("1/("+a+") + "+b+" = "+a.r().add(b));