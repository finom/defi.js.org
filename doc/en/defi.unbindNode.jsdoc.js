/**
@function defi.unbindNode
@module defi/unbindnode
@fires unbind
@fires unbind:KEY
@summary Destroys a binding between given property and HTML node
@desc Using this function you can delete a binding between a property and HTML node, which has been added recently and no longer needed.
@param {object} obj - A target object
@param {string|null} - A key or an array of keys. If you pass ``null`` instead of the key, all bindings for the given object will be deleted
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


/**
@function defi.unbindNode
@variation 3
@summary Alternative syntax of the function which allows to easily unbind unlimited amount of bindings by single ``unbindNode`` call.

@desc The variation makes possible to pass an array which includes objects with the following properties:

- ``key`` - a property name
- ``node`` - a node bound to ``key`` (optional)

This variation is useful because it matches one variation of {@link defi.bindNode} function, allowing to store bindings in a variable to easily remove them when needed.

@param {object} obj - A target object
@param {array} batch - An array of bindings
@param {eventOptions} [eventOptions] (see above)

@example
const temporaryBindings = [{
	key: 'a',
	node: '.my-node',
	binder: {
		setValue(v) {
			doSomething(v);
		}
	}
}, {
	key: 'b',
	node: document.querySelectorAll('.bar')
	event: {
		foo: 'bar'
	}
}, {
	key: 'c.d.e',
	node: jQuery('.baz'),
	binder: myBinder(),
	event: {
		silent: true,
		exactKey: true
	}
}]

defi.bindNode(obj, temporaryBindings);

// these bindings are no longer needed
defi.unbindNode(obj, temporaryBindings);
*/
