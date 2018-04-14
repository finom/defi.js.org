/**
@member {array} defi.defaultBinders
@module defi/defaultbinders
@enum {function}
@summary An array of functions which return a corresponding binder or a falsy value
@desc ``defaultBinders`` is the array of functions which check an element in turn against given rules in these functions and return a binder (see {@link #typedef-binder}). This array is used when the third argument has not been passed to the {@link defi.bindNode} function. See more detailed information about bindings in {@link defi.bindNode} documentation.
@see {@link defi.bindNode}
@see {@link defi.lookForBinder}

@example
defi.defaultBinders.unshift(element => {
	// check if the element has "foo" class name
	if(element.classList.contains('foo')) {
		// if checking is OK, return a new binder
		return {
			on: ...,
			getValue: ...,
			setValue: ...
		};
	}
});

// ...

defi.bindNode(obj, 'myKey', '.foo.bar');
*/
