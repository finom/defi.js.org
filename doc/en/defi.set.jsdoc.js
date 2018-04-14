/**
@function defi.set
@fires change
@fires change:KEY
@fires beforechange
@fires beforechange:KEY
@summary Sets a property value allowing to pass event options object
@desc The list of the supported flags:
+ ``silent`` -  do not call the ``change`` and ``change:KEY`` events
+ ``silentHTML`` - do not change states of bound HTML nodes
+ ``force`` - call the ``change`` and ``change:KEY`` events even though the property value has not been changed
+ ``forceHTML`` - change a state of bound element even though the property value has not been changed. This option is usable if the bound element has been rendered after the binding (for example, some ``option`` tags have been added to ``select`` tag)
+ ``skipMediator`` - prevents the property transformation by a mediator (see {@link defi.mediate})
+ ``skipCalc`` - prevents the work of dependencies created with {@link defi.calc}

@param {object} obj - A target object
@param {string} key - A key
@param {*} value - A value
@param {eventOptions} [eventOptions] - Event options
@example
defi.on(obj, 'change:myKey', evt => {
	alert(evt.value);
});

// the same as obj['myKey'] = 3
// or obj.myKey = 3
// alerts 3
defi.set(obj, 'myKey', 3);
@example <caption>Using ``eventOptions``</caption>
defi.on(obj, 'change:myKey', evt => {
	alert(evt.value);
});

// the handler isn't fired
defi.set(obj, 'myKey', 4, {
	silent: true
});

@example <caption>Passing custom data to a handler</caption>
defi.on(obj, 'change:myKey', evt => {
	alert(evt.myCustomFlag);
});

// alerts 42
defi.set(obj, 'myKey', 4, {
	myCustomFlag: 42
});
*/


/**
@function defi.set
@variation 2
@summary Alternative "key-value" syntax of the {@link defi.set} function
@param {object} obj - A target object
@param {object} keyValuePairs - An object containing key-value pairs
@param {eventOptions} [eventOptions] - An event object
@example
defi.set(obj, {
	myKey1: 1,
	myKey2: 2
});
@example <caption>Passing  ``eventOptions`` as a second argument</caption>
defi.set(obj, {
	myKey: 3
}, {
	myFlag: 'foo'
});
*/
