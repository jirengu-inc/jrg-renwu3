function Car(name, color, status) {

	this.name = name;
	this.color = color;
	this.status = status;
}

//方法1
Car.prototype = {
	//如果constructor很重要,重写prototype对象字面量时最好重新指定
	constructor: Car,

	//在做向后兼容时,需要注意不要覆盖已有方法,
	//如果测试发现问题,会知道旧版本已有同名的方法,用一个新方法命名
	run: Car.prototype.run || function() {
		//....
	},

	stop: Car.prototype.stop || function() {
		//....
	},
	getStatus: Car.prototype.getStatus || function() {
		//....
	}
};

//方法2:
//和字面量完全重写prototype不同,对prototype添加属性不会影响constructor
Car.prototype.run = Car.prototype.run || function() {
	//....
};
Car.prototype.stop = Car.prototype.stop || function() {
	//....
};

Car.prototype.getStatus = Car.prototype.getStatus || function() {
	//....
};

//方法3:如果明确需要覆盖旧方法,或者做全新的项目时,可以忽略以上代码维护上注意点,直接写
Car.prototype = {
	constructor: Car,

	run: function() {
		//....
	},

	stop: function() {
		//....
	},

	getStatus: function() {
		//....
	}
};