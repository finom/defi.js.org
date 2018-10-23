/**
@method defi.once
@importance 2
@fires addevent
@fires addevent:NAME
@summary Adds an event handler which can be called only once
@desc The method works the same as {@link defi.on} but the passing handler can be called only once.

@see {@link defi.on}
@see {@link defi.off}
@see {@link defi.onDebounce}
@see {@link defi.trigger}
@param {object} obj - A target object
@param {eventNames} names - An event name or some names which are separated by a space (for example, ``"change:x ajaxcomplete change:y"``)
@param {eventHandler} callback - A handler which is caused by an event
@param {object} [context] - A context of a handler
@returns {object} obj
@example
obj.x = 1;

defi.once(obj, 'change:x', () => {
	alert('x is changed');
});

obj.x = 2; // displays 'x is changed'

obj.x = 3; // does nothing
*/


/**
@method defi.once
@importance 2
@variation 2
@since 1.1
@summary Alternative syntax: "eventname-handler" pairs
@see {@link defi.on(2)}
@param {object} obj - A target object
@param {object} evtnameHandlerObject - An object where keys are event names and values are event handlers
@param {object} [context] - A context of a handler
@returns {object} obj
@example
defi.once(obj, {
	'custom': evt => { ... },
	'click::x': evt => { ... },
	'change:y': evt => { ... }
});
*/
