var body = document.getElementById("body");
var a = new jsLib.fraq();
var b = new jsLib.fraq();
console.log(a+" * "+b+" = "+a.m(b));
body.innerHTML += a+" * "+b+" = "+a.m(b)+"<br>"
console.log(a+" + "+b+" = "+a.add(b));
body.innerHTML += a+" + "+b+" = "+a.add(b)+"<br>"
console.log("1/("+a+") + "+b+" = "+a.r().add(b));
body.innerHTML += "1/("+a+") + "+b+" = "+a.r().add(b)+"<br>"