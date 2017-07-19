
var message;
message = 'Hello World!';

//alert( message );  // выведет содержимое переменной
document.write("Begin_"  +'<br \/>');

var obj1 = {
    property1: 10,
    property2: "test_pr",
    property3: true,
    //"test property": 5
    property4: undefined,
    method1: function (A) {
        return A+10;
    }
}

/*obj1 = {
    property5: 123
}
obj1.property6 = "newPr6";
*/
//document.write("obj1: " + obj1.property1 + ', ' + obj1.property2 + ', ' + obj1.property3 + '<br \/>');
for (i=4;i<9;i++)
{
    obj1['protrty'+i]=1234;
}


console.log("obj1: ", obj1);

for(var prop in obj1){
    console.log('property:', obj1[prop]);
}



//document.write("obj1: "  + obj1 + '<br \/>');

delete obj1.property6;

console.log("obj1.property6 = ",obj1.property6);
console.log("obj1.__proto__ = ",obj1.__proto__);


document.write('--' + obj1.__proto__ + '<br \/>');


console.log("______________________");

var a1= 9; //undefined
var a2= '3';  //=0;
var a3;

a3 = a1/a2; //a1+a2;

//document.write("a3 =  " + a3+ '<br \/>');
console.log("a3 = ", a3, typeof a3, isNaN(a3))

console.log("______________________");



function Duck(sound) {
    this.sound = sound;
    this.quack = function () {console.log(this.sound);}
}

var toy = new Duck("quack quack");
toy.quack();

console.log(typeof toy);
console.log(toy instanceof Duck);


//let type = typeof '123';
//document.write("type =  " + type+ '<br \/>');

/*
console.log("______________________");
function fun_test_1() {
    console.log("---> fun_test_1");
    //return 6;
}
var T_f = fun_test_1();
//console.log("T_f =  ", T_f);
console.log("______________________");
*/
/*
var trstTupe = null;  // ={}  =[];
console.log(typeof trstTupe);
//console.log(typeof obj1.method1)
*/

function init()
{
    console.log("function init - START ");
    var access = document.getElementById("code9");
    //var code = access.innerHTML;
    //code = code + " midnight";
    //alert(code);
    access.innerHTML = "Hello =)";
    access.setAttribute("class","redtext")
}
window.onload = init();