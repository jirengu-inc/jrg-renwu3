function funInstanceOf(obj, constructor) {

	var __proto__ = Object.getPrototypeOf(obj);
	do {

		if (__proto__ === constructor.prototype) return true;

	}
	while (__proto__ = Object.getPrototypeOf(__proto__));

	return false;
}