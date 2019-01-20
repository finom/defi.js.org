## [Introduction](#!introduction)

> Before we start, in case if you found an inaccuracy or a typo on this page, feel free to open an issue [here](https://github.com/defijs/defi.js.org).

**defi.js** bunch of utilities that enable accessor-based reactivity for JavaScript objects.

It can be installed via NPM:

```js
npm i defi
```

```js
const { bindNode, calc } = require('defi');

bindNode(obj, 'key', node)
```

Or [downloaded to use as a global variable](https://github.com/defijs/defi/tree/gh-pages)

```js
// use defi as a global variable
defi.bindNode(obj, 'key', node)
```


### How would I use it?

As a simple task let's say you want to define a simple form with first name and last name input, where while you type a greeting appears.

```html
<input class="first">
<input class="last">
<output class="greeting"></output>
```

```js
// default data
const obj = {
  first: 'John',
  last: 'Doe'
};

// let's listen for first and last name changes
defi.on(obj, 'change:first', () => console.log('First name is changed'));
defi.on(obj, 'change:last', () => console.log('Last name is changed'));

// we would like to re-calculate 'greeting' property every time
// when the first or last are changed
defi.calc(obj, 'greeting', ['first', 'last'], (first, last) => `Hello, ${first} ${last}`);

// and we want to set up a two-way data binding between the props
// and corresponding DOM nodes
defi.bindNode(obj, {
  first: '.first',
  last: '.last',
  greeting: '.greeting'
});
```

If `first` or `last` is changed then event handlers print info about that to console, `greeting` property is updated, `.greeting` element is populated by calculated data (by default "Hello, John Doe"). And it happens every time when these properties are changed and it doesn't matter which way. You can do `obj.first = 'Jane'` or you can type text into its field, and everything will happen immediately.

That's the real accessor-based reactiveness! Check the example above [here](https://jsbin.com/xuzohanuno/1/edit?html,js,console,output) and try to type `obj.first = 'Jane'` at the "Console" tab.

Note that if you want to use a custom HTML element (at the example above we use ``<output>`` tag) to update its innerHTML you will need to pass so-called "binder" as a rule of how the bound element should behave. By default ``defi.bindNode`` doesn't know how to interact with non-form elements.


```js
const htmlBinder = {
  setValue: (value, binding) => binding.node.innerHTML = value,
};
// this will update innerHTML for any element when obj.greeting is changed
defi.bindNode(obj, 'greeting', '.greeting', htmlBinder)
```

Also you can use ``html`` from [common-binders](https://github.com/defijs/common-binders) (a collection of binders of general purpose).

```js
const { html } = require('common-binders');
defi.bindNode(obj, 'greeting', '.greeting', html())
```
