/**
An event handler. Takes any arguments passed to {@link defi.trigger}
@callback eventHandler
@param {...*} options - Any arguments
@example
const eventHandler = (...args) => {
	console.log(args);
};
defi.on(obj, 'fyeah', eventHandler);
// logs 'foo', 'bar', 'baz'
defi.trigger(obj, 'fyeah', 'foo', 'bar', 'baz');
*/


/**
Event name or space-delimited list of event names.

##### Custom events.
```js
defi.on(obj, 'myevent', () => {...});
defi.trigger(obj, 'myevent');
```

##### ``change:KEY`` which is triggered every time when a property is changed.
```js
defi.on(obj, 'change:x', evt => {...});
obj.x = 42;
```

##### ``beforechange:KEY`` which is triggered every time before a property is changed.
```js
defi.on(obj, 'beforechange:x', evt => {...});
obj.x = 42;
```

##### ``addevent:NAME`` and ``addevent`` which are triggered on event add.
```js
// for any event
defi.on(obj, 'addevent', evt => {...});
// for "someevent" event
defi.on(obj, 'addevent:someevent', evt => {...});
// the line below fires "addevent" and "addevent:someevent"
defi.on(obj, 'someevent', evt => {...});
```

##### ``removeevent:NAME`` and ``removeevent`` which are triggered on event remove.
```js
// for any event
defi.on(obj, 'removeevent', evt => {...});
// for "someevent" event
defi.on(obj, 'removeevent:someevent', evt => {...});
// the line below fires "removeevent" and "removeevent:someevent"
defi.off(obj, 'someevent', evt => {...});
```

##### ``DOM_EVENT::KEY``, where DOM_EVENT is a name of DOM event, KEY is a key. A handler is called when DOM_EVENT is triggered on a node which is bound to the KEY.
```js
defi.bindNode(obj, 'x', '.my-div');
defi.on(obj, 'click::x', evt => {
	alert('clicked ".my-div"');
});
```

##### ``DOM_EVENT::KEY(SELECTOR)``, where DOM_EVENT is a name of DOM event, KEY is a key, SELECTOR is a selector. A handler is called when DOM_EVENT is triggered on a node which matches the SELECTOR within a node bound to the KEY.
```html
<div class="my-div">
	<button class="my-button"></button>
</div>
```
```js
defi.bindNode(obj, 'x', '.my-div');
defi.on(obj, 'click::x(.my-button)', evt => {
	alert('clicked ".my-button"');
});
```

##### Delegated events: ``PATH@EVENT``, where PATH is a path to a target object whose events we want to listen, EVENT is an event name.
```js
defi.on(obj,'a@someevent', () => {...});
defi.on(obj, 'a.b.c@change:d', () => {...});
```

##### Any combinations. All events described above can be combined.
```js
this.on('x.y.z@click::u(.my-selector)', () => {...});
```
@typedef {string} eventNames
*/


/**
``binder`` contains all information about how to synchronize instance property value with DOM node state. Every member of a binder uses HTML node as its context (``this``)
@typedef {object} binder
@property {string|function} [on] - DOM event (or space-delimited list of events) which tells when the node state is changed. Besides, it accepts a function as a value if you need to customize a listener definition
@property {function} [getValue] - A function which tells how to retrieve a value (state) from HTML node when DOM event is fired
@property {function} [setValue] - A function which tells how to change DOM node when the property value is changed
@property {function} [initialize] - A function which is called before binding is launched. For example it can initialize jQuery plugin or something else
@property {function} [destroy] - A function which is called when a binding is removed using ``unbindNode`` method
@example
const binder = {
	on: 'click',
	getValue(bindingOptions) {
		return this.value;
	},
	setValue(v, bindingOptions) {
		this.value = v;
	},
	initialize(bindingOptions) {
		alert('A binding is initialized');
	},
	destroy(bindingOptions) {
		alert('A binding is destroyed');
	}
};

defi.bindNode(obj, 'a', '.my-checkbox', binder);
@example
const binder = {
	on(callback, bindingOptions) {
		this.onclick = callback;
	},
	// ...
};
// ...
*/


/**
An event object
@typedef {object} eventOptions
@desc An object which can contain service flags or custom data which will be passed to an event handler
@example
const eventOptions = { silent: true };

obj.a = 1;

defi.on(obj, 'change:a', () => {
	alert('a is changed');
});

defi.set(obj, 'a', 2, eventOptions); // no alert
@example
const eventOptions = { f: 'yeah' };

obj.a = 1;

defi.on(obj, 'change:a', eventOptions => {
	alert(eventOptions.f);
});

defi.set(obj, 'a', 2, eventOptions); // alerts "yeah"
*/

/**
A DOM node
@typedef node
@example
const node = document.querySelector('.foo');
*/

/**
DOM nodes collection. For example, jQuery instance or NodeList.
@typedef $nodes
@example
let $nodes = $('.foo');
$nodes = document.querySelectorAll('.bar');
*/

/**
A string
@typedef string
@example
const foo = 'bar';
*/

/**
A boolean
@typedef boolean
@example
const bool = true;
*/

/**
A number
@typedef number
@example
const num = 42;
*/

/**
An object
@typedef object
@example
const obj = {
	foo: 'x',
	['bar']: 'y'
};
*/

/**
An array
@typedef array
@example
const arr = ['foo', undefined, null, () => {}];
*/

/**
A function
@typedef function
@example
function comeOnBarbieLetsGoParty() {
	alert("I'm a Barbie girl, in a Barbie world");
}
*/

/**
null, just null
@typedef null
@example
const x = null;
*/

/**
Any type
@typedef *
@example
let whatever = 'foo';
whatever = 42;
*/
