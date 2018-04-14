/**
@function defi.mediate
@module defi/mediate
@summary Transforms property value on its changing
@desc This function is used for transforming property value on its changing. For example, you want the property value to be always either of a certain type or an integer value, or to be no less than zero and no more than a hundred etc.

@param {object} obj - A target object
@param {string|array} key - A key or an array of keys
@param {function} mediator - A function-mediator which returns a new value. It gets the following arguments: new value, previous value, a key, an object itself

@returns {object} obj

@example
defi.mediate(obj, 'x', value => String(value));

obj.x = 1;

alert(typeof obj.x); // "string"

@example <caption>An array of keys</caption>
defi.mediate(obj, ['x', 'y'], value => String(value));
*/


/**
@function defi.mediate
@variation 2
@summary Alternative syntax of the {@link defi.mediate} function which accepts "key-mediator" object as an argument
@param {object} keyMediatorPairs - An object with key-mediator properties
@example
defi.mediate(obj, {
	x: String,
	y: Number,
	z: Boolean
});
obj.x = 1;
obj.y = 2;
obj.z = 3;
alert(typeof obj.x); // "string"
alert(typeof obj.y); // "number"
alert(typeof obj.z); // "boolean"
*/
