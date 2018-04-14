/**
@method defi.remove
@importance 3
@fires delete
@fires delete:KEY
@summary Deletes a property and removes dependent handlers
@param {object} obj - A target object
@param {string} key - A property name or an array of names to remove
@param {eventOptions} [eventOptions] - An event options
@returns {object} obj
@example
defi.remove(obj, 'myKey');
defi.remove(obj, ['myKey1', 'myKey2']);
@example <caption>Using  ``eventOptions``</caption>
defi.remove(obj, 'myKey', {
	silent: true
});
*/
