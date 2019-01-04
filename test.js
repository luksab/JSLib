var body = document.getElementById("body");
var a = new jsLib.fraq();
var b = new jsLib.fraq();
console.log(a+" * "+b+" = "+a.m(b));
body.innerHTML += a+" * "+b+" = "+a.m(b)+"<br>"
console.log(a+(b.sign?" + ":" ")+b+" = "+a.add(b));
body.innerHTML += a+(b.sign?" + ":" ")+b+" = "+a.add(b)+"<br>"
console.log("1/("+a+")"+(b.sign?" + ":" ")+b+" = "+a.r().add(b));
body.innerHTML += "1/("+a+")"+(b.sign?" + ":" ")+b+" = "+a.r().add(b)+"<br>"
a = new jsLib.fraq(2,2)
console.log("2/2 * 0.5 = "+a.m(0.5)+"");
body.innerHTML += "2/2 * 0.5 = "+a.m(0.5)+"<br>"