function isInstanceOf(obj,func){
    var __proto__ = __proto__.__proto__
    do{
        if(obj.__proto__ == func.prototype){return true;}
        if(!__proto__){return false;}
    }while(__proto__ = __proto__.__proto__)
};