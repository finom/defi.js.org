## [The events](#!events)


The article explains events in defi.js. They can be called a heart of defi.js because they power all the magic happened at ``calc``, ``bindNode``, and other methods.

### Basics

#### Custom events

Let’s start with the simplest thing. In defi.js events can be added with the help of [on](#!defi.on) method.

```js
const handler = () => {
  alert('"someevent" is fired');
};
defi.on(object, 'someevent', handler);
```

Where the list of events can be passed to.

```js
defi.on(object, ['someevent1', 'someevent2'], handler);
```

Events can be fired with [trigger](#!defi.trigger) method.

```js
defi.trigger(object, 'someevent');
```

At the same time, you can pass some data to the handler having determined the first and the following arguments.

```js
defi.on(object, 'someevent', (a, b, c) => {
  alert([a, b, c]); // 1,2,3
});
defi.trigger(object, 'someevent', 1, 2, 3);
```

``on`` method accepts options which can affect on cases when the handler should be called. ``once: true`` makes the handler called only once.

```js
defi.on(object, 'someevent', handler, { once: true });

defi.trigger(object, 'someevent'); // the handler is called
defi.trigger(object, 'someevent'); // the handler isn't called any more

```

``debounce: true`` or ``debounce: delay`` "debounces" the handler. When an event fires out, the timer with the specified delay by a programmer starts. If no event with the same name is called upon the expiry of the timer, a handler is called. If an event fires before the delay is over, the timer updates and waits again. This is the implementation of a very popular "debounce" micropattern which you can read about on [this page](http://davidwalsh.name/javascript-debounce-function).

```js
defi.on(object, 'someevent', () => {
  alert('yep');
}, { debounce: 500 });
for(let i = 0; i < 1000; i++) {
  defi.trigger(object, 'someevent');
}
// it will show ‘yep’ only once in 500ms
```

#### Events of property changing

When a property is changed, defi.js fires an event: ``"change:KEY"``.

```js
defi.on(object, 'change:x', () => {
    alert('x is changed');
});
object.x = 42;
```

In case you want to pass some data to the event handler or change a property value without calling ``"change:KEY"`` event, instead of a usual assignment use [defi.set](#!defi.set) method which accepts three arguments: a key, a value and an object with data or special flags.

```js
defi.on(object, 'change:x', evt => {
    alert(evt.someData);
});

defi.set(object, 'x', 42, { someData: 'foo' });
```

You can change a property without calling an event handler in this way:

```js
// changing doesn’t fire an event
defi.set(object, 'x', 9000, { silent: true });
```

``set`` method supports some more flags, the description of which would make us go beyond the topic of the article, so I refer you to the [documentation of the method](#!defi.set).

#### Events which are being fired before a property changing

``"beforechange:KEY"`` is being fired before a property changing. The event can be useful in cases you define ``"change:KEY"`` event and want to call the code which precedes this event.

```js
defi.on(object, 'beforechange:x', () => {
    alert('x will be changed in a few microseconds');
});
```

As usually, you can pass some data to the handler or cancel an event triggering.

```js
defi.on(object,'beforechange:x', evt => {
    alert(evt.someData);
});

defi.set(object, 'x', 42, { someData: 'foo' });

// changing doesn’t fire an event
defi.set(object, 'x', 9000, { silent: true });
```

#### Events of a property removing

On removing properties with [defi.remove](#!defi.remove) method, ``"delete:KEY"`` and ``delete`` events are fired.

```js
defi.on(object, 'delete:x', () => {
    alert('x is deleted');
});

defi.on(object, 'delete', evt => {
  alert(`${evt.key} is deleted`);
});

defi.remove(object, 'x');
```

#### Binding events

On the binding declaration two events: ``"bind"`` and ``"bind:KEY"`` are fired, where ``KEY`` is a key of a bound property.

```js
defi.on(object, 'bind:x', () => {
    alert('x is bound');
});

defi.on(object, 'bind', evt => {
    alert(`${evt.key} is bound`);
});

defi.bindNode(object, 'x', '.my-node');
```

This event can be of use, for example, when you need to execute your code after binding made in a separate module.


### The events of event adding/removing

When an event is added, ``"addevent"`` and ``"addevent:NAME"`` events are fired, and when an event is removed, ``"removeevent"`` and ``"removeevent:NAME"`` events are fired, where ``NAME`` is an event name.

```js
defi.on(object, 'addevent', handler);
defi.on(object, 'addevent:someevent', handler);
defi.on(object, 'removeevent', handler);
defi.on(object, 'removeevent:someevent', handler);
```

One of the ways of its application can be the use of defi.js as an event engine of a third-party library. Let’s say, you want to place all handlers of all external libraries into one [on](#!defi.on) call, having made the code more readable and compact. With the help of ``addevent`` you catch all further event initializations, and in the handler you check an event name against some conditions and initialize an event using API of a third-party library.

In the example below there’s a code from a project which uses Fabric.js. ``"addevent"`` handler checks an event name for the presence of ``"fabric:"`` prefix and if checking is passed, it adds the corresponding handler to the canvas with the help of Fabric API.

```js
object.canvas = new fabric.Canvas(node);
defi.on(object,{
    'addevent': evt => {
        const { name, callback } = evt;
        const prefix = 'fabric:';
        if(name.indexOf(prefix) == 0) {
            const fabricEventName = name.slice(prefix.length);
            // add an event to the canvas
            object.canvas.on(fabricEventName, callback);
        }
    },
    'fabric:after:render': evt => {
        object.data = object.canvas.toObject();
    },
    'fabric:object:selected': evt => { /* ... */ }
});
```

### Delegated events

Now let’s get down to the most interesting: event delegations. The syntax of delegated events is as follows: ``"PATH@EVENT_NAME"``, where ``PATH`` is a path (properties are separated by a dot) to an object which ``EVENT_NAME`` event needs to be added to. Let’s consider examples below.

#### Example 1
You want to add an event handler in ``"a"`` property which in its turn is an object.

```js
defi.on(object, 'a@someevent', handler);
```

The handler will be called when ``"someevent"`` event has been fired in the ``"a"`` object.

```js
defi.trigger(obj.a, 'someevent');
```

Also, the handler can be declared before ``"a"`` property is set. If ``"a"`` property is rewritten into another object, inner mechanism of the library will catch this change, remove the handler from the previous property value and add it to a new value (if the new value is an object as well).

```js
obj.a = {};
defi.trigger(obj.a, 'someevent');
```

The handler will be called again.

#### Example 2
Let’s go deeper. Suppose we have ``"a"`` property that contains an object with ``"b"`` property, in which ``"someevent"`` event must be fired. In this case properties are separated by a dot:

```js
defi.on(object, 'a.b@someevent', handler);
defi.trigger(object.a.b, 'someevent');
```

#### Example 3

Besides custom events, you can use the ones which are built in defi.js as well. Instead of ``"someevent"`` you can use ``"change:KEY"`` event described above.

```js
// in “a” object there’s “b” object,
// in which we listen to changes of “c” property.
defi.on(object, 'a.b@change:c', handler);
```

Let me remind you that delegated events are added dynamically. On declaring a handler any branch of the way may be absent. If anything is overridden in the object tree, the binding to the old value is disrupted and a new one is created with a new value:

```js
defi.on(object, 'a.b.c.d@someevent', handler);
object.a.b = { c: { d: {} } };
defi.trigger(object.a.b.c.d, 'someevent');
```

### DOM events

defi.js is known to allow bindings of DOM elements on a page to some object properties implementing one-way or two-way data binding:

```js
defi.bindNode(object, 'x', '.my-node');
```

[More detailed information about bindNode method](#!defi.bindNode).

Before or after the declaration of the binding you can create a handler that listens to DOM events of the bound element. The syntax is as follows: ``"DOM_EVENT::KEY"``, where ``DOM_EVENT`` is DOM event, and ``KEY`` is a key of a bound property. ``DOM_EVENT`` and ``KEY`` are separated by a double colon.

```js
defi.on(object, 'click::x', evt => {
  evt.preventDefault();
});
```

The object of original DOM event is under ``"domEvent"`` key of the event object passed to the handler. Besides, there are several properties and methods available in the object so as not to address ``"domEvent"`` every time: ``"preventDefault"``, ``"stopPropagation"``, ``"which"``, ``"target"`` and some other properties.

This opportunity is just a syntactic sugar over ordinary DOM events and the code below does the same things as the previous one:

```js
document.querySelector('.my-node').addEventListener('click', evt => {
    evt.preventDefault();
});
```

#### Delegated DOM events

Event declaring from the example above requires binding declaring. You must take two steps: call ``bindNode`` method and declare the event as such. It isn’t always convenient because there are often some cases when DOM node isn’t used anywhere except only one DOM event. For this case there is another syntax variant of DOM events which looks like ``"DOM_EVENT::KEY(SELECTOR)"``. In this case ``KEY`` is some key bound to some DOM node. And ``SELECTOR`` is a selector of DOM node that is a child of the one bound to ``KEY``.

HTML:
```html
<div class="my-node">
    <span class="my-inner-node"></span>
</div>
```
JS:
```js
defi.bindNode(object, 'x', '.my-node');
defi.on(object, 'click::x(.my-inner-node)', handler);
```
