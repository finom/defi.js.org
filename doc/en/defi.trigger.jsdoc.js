/**
@function defi.trigger
@module defi/trigger
@summary Fires an event
@desc After adding event handlers using {@link defi.on} any event can be fired manually using this function.

@see {@link defi.on}
@see {@link defi.off}
@param {object} obj - A target object
@param {eventNames} [names] - An event name or an array of names
@param {...*} [arg] - Any arguments which will be passed to every event handler
@returns {object} obj
@example
defi.on(obj, ['foo', 'bar'], (a, b, c) => {
	alert(a + b + c);
});
defi.trigger(obj, 'foo', 1, 2, 3); // alerts 6
*/
