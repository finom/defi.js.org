/**
@function defi.bound
@module defi/bound
@summary Returns a bound element
@desc > Skip this section if you're using **defi-react** because React handles DOM rendering by its own.
@param {object} obj - A target object
@param {string} key - A name of a property, which bound elements you want to get
@param {object} options - You can pass `all: true` if you want to get all elements bound to the key
@example
defi.bindNode(obj, 'x', '.my-element');
defi.bound(obj, 'x'); // will return document.querySelector('.my-element')

@example
defi.bindNode(obj, 'x', '.my-element');
defi.bound(obj, 'x', { all: true }); // will return an array of elements bound to "x"
*/
