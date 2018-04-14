/**
@method defi.trigger
@importance 1
@summary Fires an event
@desc After adding event handlers using {@link defi.on}, {@link defi.onDebounce} or {@link defi.once}, any event can be fired manually using this method.

> Note that the method has {@link defi.trigger static alternative}

@see {@link defi.on}
@see {@link defi.once}
@see {@link defi.onDebounce}
@see {@link defi.off}
@param {eventNames} [names] - An event name or some names which are separated by a space
@param {...*} [arg] - Any arguments which will be passed to every handler
@returns {matreshka} self
@example
this.on('foo bar', (a, b, c) => {
	alert(a + b + c);
});
this.trigger('foo', 1, 2, 3); // alerts 6
*/
