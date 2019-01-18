/**
@function defi.on
@module defi/on
@fires addevent
@fires addevent:NAME
@summary Adds an event handler
@desc The function adds an event handler for an object. Refer to the complete list of possible events with the description here: {@link #typedef-eventNames}.

@see {@link defi.off}
@see {@link defi.trigger}
@param {object} obj - A target object
@param {eventNames} names - An event name or some names which are separated by a space (for example, ``"change:x ajaxcomplete change:y"``)
@param {eventHandler} callback - A function which is caused by the event
@param {object} options - Options object where``triggerOnInit`` (boolean) makes the handler called immediately after event initialization, ``once`` (boolean) makes the handler called only once, ``debounce`` (boolean or # of milliseconds) debounces the handler
@returns {object} obj
@example
defi.on(obj, 'foo', () => {
	alert('A custom Event is fired');
});

defi.trigger(obj, 'foo');

@example <caption>Calling a handler immediately after event initialization</caption>
// Displays "bar" at once and waits for a firing of "foo" event
defi.on(obj, 'foo', () => {
	alert('bar');
}, { triggerOnInit: true });
*/

/**
@function defi.on
@variation 2
@summary Alternative syntax: "eventname-handler" pairs
@desc In the {@link defi.on} function the object with the key-element pairs can be passed to avoid multiple invocation of the function and reduce your code.
@param {object} obj - A target object
@param {object} evtnameHandlerObject - An object where keys are event names and values are event handlers
@param {object} options - See above.
@param {object} obj - A target object

@example
defi.on(obj, {
	'custom': evt => ...,
	'click::x': evt => ...,
	'change:y': evt => ...,
});
*/
