## [Introduction](#!introduction)

**defi.js** bunch of utilities that enable accessor-based reactivity for JavaScript objects.

It can be installed via NPM:

```
npm i defi
```

```js
const { bindNode, calc } = require('defi');

bindNode(obj, 'key', node)
```

Or [downloaded to use as a global variable](https://github.com/finom/defi/tree/gh-pages)

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

If `first` or `last` is changed then event handlers print info about that to console, `greeting` property is updated, `.greeting` element is populated by calculated data (by default "Hello, John Doe"). And it happens every time when these properties are changed and it doesn't matter which way. You can do `obj.first = 'Jane'` or you can type text into its field, and everything will happen immediately. That's the real reactiveness. Check the example above [here](http://jsbin.com/qolulirela/3/edit) and try to type `obj.first = 'Jane'` at "Console" tab.


### I have seen that before!

defi.js is a hard-fork of [Matreshka.js framework](https://github.com/matreshkajs/matreshka) which includes a subset of its functions. It's created for applications which don't need a full list of features like array rendering but require quick and clear two-way data binding features and sugared reactivity.

Note that defi.js is compatible with the most of Matreshka.js add-ons:

- [Router](https://github.com/matreshkajs/matreshka-router)
- [Form parser](https://github.com/matreshkajs/matreshka-parse-form)
- [File binders](https://github.com/matreshkajs/file-binders)
- [Codemirror binder](https://github.com/matreshkajs/matreshka-binder-codemirror)

Also there is a [standalone set of common binders](https://github.com/finom/common-binders) compatible with both libraries.
