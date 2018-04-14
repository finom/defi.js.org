/**
@method defi.calc
@importance 1
@since 2.0
@summary Creates a dependency of one property value on values of others
@desc ``calc`` creates a dependency of a property (``target`` argument) on values of other properties (``source`` argument). When source property is changed, ``target`` is re-calculated automatically.

``source`` arg has few variations.

#### A string

A ``target`` property is dependent on ``source`` property.

```js
obj.b = 1;
defi.calc(obj, 'a', 'b', b => b * 2);
console.log(obj.a); // 2
```

#### An array of strings

A ``target`` is dependent on properties listed at ``source`` array.

```js
obj.b = 1;
obj.c = 2;
obj.d = 3;
defi.calc(obj, 'a', ['b', 'c', 'd'], (b, c, d) => b + c + d);
console.log(obj.a); // 6
```

#### An object with properties ``object`` and ``key``

At this case ``target`` property is dependent on a property from another object.

```js
const someObject = { b: 1 };
defi.calc(obj, 'a', {
	object: someObject,
	key: 'b'
}, b => b * 2);

console.log(obj.a); // 2
```

``key`` property also accepts an array of property names.

```js
const someObject = {
	b: 1,
	c: 2,
	d: 3
};
defi.calc(obj, 'a', {
	object: someObject,
	key: ['b', 'c', 'd']
}, (b, c, d) => b + c + d);

console.log(obj.a); // 6
```

#### An array of object with properties ``object`` и ``key``

This variation allows to define dependency from properties of different objects.

```js
const someObjectX = {
	b: 1,
	c: 2
};
const someObjectY = {
	d: 3
};
defi.calc(obj, 'a', [{
	object: someObjectX,
	key: ['b', 'c']
}, {
	object: someObjectY,
	key: 'd'
}], (b, c, d) => b + c + d);

console.log(obj.a); // 6
```

#### A combination of strings (own properties) and objects

```js
obj.b = 1;
obj.c = 2;

const someObject = {
	d: 3,
	e: 4
};

defi.calc(obj, 'a', ['b', 'c', {
	object: someObjectX,
	key: ['d', 'e']
}], (b, c, d, e) => b + c + d + e);

console.log(obj.a); // 10
```

For reasons of code purity, the combination of strings and objects inside ``source`` array is not recommended. Instead, pass an object whose ``object`` property refers to source object. An example below makes the same job as shown at the previous example.


```js
obj.b = 1;
obj.c = 2;

const someObject = {
	d: 3,
	e: 4
};

defi.calc(obj, 'a', [{
	object: obj, // the target object
	keys: ['b', 'c']
}, {
	object: someObjectX,
	key: ['d', 'e']
}], (b, c, d, e) => b + c + d + e);

console.log(obj.a); // 10
```

#### A path to source property

If source property name includes a dot then the method initiates a dependency on a property from nested object.

```js
obj.b = { c: { d: 1 } };
obj.e = { f: { g: 2 } };

defi.calc(obj, 'a', ['b.c.d', 'e.f.g'], (d, g) => d + g);

console.log(obj.a); // 3
```

The same thing works for external sources.
```js
obj.b = { c: { d: 1 } };
const someObject = { e: { f: { g: 2 } } };

defi.calc(obj, 'a', [{
	object: obj
	key: 'b.c.d'
}, {
	object: someObject
	key; 'e.f.g'
}], (d, g) => d + g);

console.log(obj.a); // 3
```

> The method is protected from circular references (for example, ``a`` depends on ``b``, ``b`` depends on ``c`` and ``c`` depends on ``a``) and if there is a calculation problem, it does not block the page and does not throw an exception about the stack over-flow.

As you may noticed, arguments of ``handler`` function always follow the same order as source properties appear.

In case if you want to change a value of one source property and make it so that target property will not be recalculated, then use {@link defi.set} method with ``skipCalc`` flag.

```js
defi.calc(obj, 'a', 'b', handler);
defi.set(obj, 'b', newValue, {
    skipCalc: true
});
```

### Important features of the method and special flags

The fifth argument of ``calc`` method is  ``eventOptions``. As usual this object can include special flags or custom data which will be passed to ``change:TARGET`` event handler.

```js
defi.on(obj, 'change:a', evt => {
	console.log(evt.foo); // 'bar'
});

defi.calc(obj, 'a', source, handler, { foo: 'bar' });
```

#### A flag ``debounceCalc=true``

After ``calc`` is called, a target property is calculated with no delays. But when source property is changed the debounce pattern is used. That means that target property will be changed in few milliseconds and only once even if source properties was changed many times in a short time.

```js
obj.b = 1;
obj.c = 2;
obj.d = 3;

defi.calc(obj, 'a', ['b', 'c', 'd'], (b, c, d) => b + c + d);

defi.on(obj, 'change:a', () => {
	// the handler will be called only once
	// despite that source properties was changed thrice
	console.log(`a is changed to ${obj.a}`); // a is changed to 60
});

obj.b = 10;
obj.c = 20;
obj.d = 30;
console.log(obj.a); // 6 instead of 60
```

To cancel debounce pattern when source properties are changed, in other words to make the calculation synchronously pass ``debounceCalc`` with ``false`` value to the method.

```js
obj.b = 1;
obj.c = 2;
obj.d = 3;

defi.calc(obj, 'a', ['b', 'c', 'd'], (b, c, d) => b + c + d, {
	debounceCalc: false
});

defi.on(obj, 'change:a', () => {
	// the handler will be called thrice
	// every time when b, c or d are changed

    // a is changed to... 15, 33, 60
	console.log(`a is changed to ${obj.a}`);
});

obj.b = 10;
obj.c = 20;
obj.d = 30;
console.log(obj.a); // 60
```

#### A flag ``debounceCalcOnInit=false``

As described above, target property is calculated immediately after the ``calc`` is called. To turn on debounce on ``calc`` call pass ``debounceCalcOnInit`` with ``true`` value to the method.

```js
defi.on(obj, 'change:a', () => {
	// the handler will be called only once in a moment
	console.log(`a is changed to ${obj.a}`); // a is changed to 6
});

obj.b = 1;
obj.c = 2;
obj.d = 3;

defi.calc(obj, 'a', ['b', 'c', 'd'], (b, c, d) => b + c + d, {
    debounceCalcOnInit: true
});

console.log(obj.a); // undefined
```

In real world ``debounceCalcOnInit`` flag is unlikely to be useful. Just keep in mind that you can enable "total debounce" if needed.

#### A flag ``debounceCalcDelay=0``

The flag can be used to set debounce delay when ``debounceCalc`` or ``debounceCalcOnInit`` is set as ``true``.

#### A flag ``setOnInit=true``

It is known that target property gets new value after ``calc`` is called. To cancel this behavior and don't calculate a property immediately use ``setOnInit`` with ``false`` value.

```js
defi.calc(obj, 'a', 'b', b => b * 2, {
    setOnInit: false
});

console.log(obj.a); // undefined

// but if obj.b is changed the target property will be calculated
obj.b = 1;
```

#### A flag ``exactKey=false``

As described above, it's possible to use a path to source property using a string that contains dots. In case if you need to use exact name of source property use ``exactKey`` with ``true`` value.

```js
obj['foo.bar.baz'] = 1;
defi.calc(obj, 'a', 'foo.bar.baz', fooBarBaz => fooBarBaz * 2, {
    exactKey: true
});
console.log(obj.a); // 2
```

#### A flag ``promiseCalc=false``

This flag allows to return ``Promise`` instance from the calculating function. Target property gets its value from resolved promise.

> Warning! ``Promise`` cannot be canceled. Use the ``promiseCalc`` feature carefully and don't allow multiple calls of heavy functions.

```js
defi.calc(obj, 'a', ['b', 'c'], (b, c) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(a + b)
		}, 1000);
	});
}, {
	promiseCalc: true
});

obj.b = 1;
obj.c = 2;

// "a" will be changed in a second
```

```js
defi.calc(obj, 'response', 'data', async (data) => {
	const resp = await fetch(url, {
		method: 'post',
		body: data
	});

	return resp.json();
}, {
	promiseCalc: true
});
```

@param {object} obj - A target object
@param {string} targetKey - A property which needs to be calculated
@param {string|array} source - Which properties the target property is depended on
@param {function} [handler=(v)=>v] - A function which returns a new value
@param {eventOptions} [eventOptions] - An object which can contain some special flags or data for ``change:KEY`` handler (see above)

@example

defi.calc(obj, 'greeting', 'name', name => `Hello, ${name}!`);

obj.name = 'World';

// ... in a moment
alert(obj.greeting); // 'Hello, World!'

@example <caption>The calculation of the rectangle perimeter with two sides known (and the calculation of the sides with the perimeter known)</caption>
obj.a = 3;
obj.b = 4;

obj.chain(obj)
    .calc('p', ['a', 'b'], (a, b) => (a + b) * 2)
    .calc('a', ['p', 'b'], (p, b) => p/2 - b)
    .calc('b', ['p', 'a'], (p, a) => p/2 - a);

alert(obj.p); // 14

defi.on(obj, 'change:p', () => {
    // "The perimeter has been changed and equals 18"
    console.log(`The perimeter has been changed and equals ${obj.p}`);
});

obj.a = 5;
*/


/**
@method defi.calc
@importance 2
@variation batch
@since 2.0
@summary Extra syntax for {@link defi.calc}. Allows to define few calculated properties per single call of the method.

@desc The first argument is an object whose keys are property names and values are objects with the following data:

- ``source`` - which properties the target property is depended on;
- ``handler`` - a function which returns a new value of a property (by default it equals to ``(value) => value``);
- ``event`` - event options.

The third argument contains common event options which extend ``event`` of every item (properties of ``event`` have higher priority).

``source`` can take any kind of look as {@link defi.calc described above} (a string, an array of strings etc).

@param {object} obj - A target object
@param {array} batch - An object which includes all information about calculated properties
@param {eventOptions} [commonEventOptions] - Event options which are common for all listed calculated properties

@example

defi.calc(obj, {
	x: {
    	source: ['a', 'b'],
    	handler: (a, b) => a + b
	},
	y: {
	    source: {
	        object: someObject,
	        key: 'c'
	    },
	    event: {
	        setOnInit: false
	    }
	},
	z: {
	    source: [{
	        object: this,
	        key: 'x'
	    }, {
	        object: someObject,
	        key: 'd'
	    }],
	    handler: (x, d) => x + d
	}
}, {
    debounceCalc: false
});
*/
