//定义模块
/*function print() {
	console.log("ConmmonJS 模块定义");
}
module.exports = print;

*/
define('task38-practice', function(){
    var name = 'Byron';
    function printName(){
        console.log(name);
    }

    return {
        printName: printName
    };
});

/*
define(function(){
    var name = 'Byron';
    function printName(){
        console.log(name);
    }

    return {
        printName: printName
    };
});
*/

