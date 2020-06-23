/**
@function defi.unbindNode
@module defi/unbindnode
@fires unbind
@fires unbind:KEY
@summary Destroys a binding between given property and HTML node
@desc Using this function you can delete a binding between a property and HTML node, which has been added recently and no longer needed.
@param {object} obj - A target object
@param {string|null} key - A key or an array of keys. If you pass ``null`` instead of the key, all bindings for the given object will be deleted
@param {string|node|$nodes} [node] - HTML node
@param {eventOptions} [eventOptions] -  Event object (``"silent"`` key disables firing the events ``"unbind"`` and ``"unbind:KEY"``)
@returns {object} obj
@example
defi.bindNode(obj, 'myKey', '.my-element');

// changes the property value and the state of the HTML element
obj.myKey = true;

defi.unbindNode(obj, 'myKey', '.my-element');

// only the property value is being changed now
obj.myKey = false;
*/


/**
@function defi.unbindNode
@variation 2
@summary Alternative syntax which allows to pass an object with bindings to ``unbindNode``. Look at {@link defi.bindNode(2)} for more information
@param {object} obj - A target object
@param {object} bindings (see the example)
@param {eventOptions} [eventOptions] (see above)
@returns {object} obj
@example
defi.unbindNode(obj, {
	foo: '.aaa'
	bar: {
		node: '.bbb'
	},
	baz: [{
		node: '.ccc'
	}, {
		node: '.ddd'
	}]
});
*/
