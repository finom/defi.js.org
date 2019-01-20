/**
@function defi.chain
@module defi/chain
@summary Allows chained calls of defi.js functions

@desc The function accepts any object and returns an instance of a class which adopts functions allowing them to be called in a chain.

@param {object} obj - An object
@returns {object} An instance of the class which adopts defi functions

@example
defi.chain(obj)
    .calc('a', 'b', b => b * 2)
    .set('b', 3)
    .bindNode('c', '.node');

// the same as
// defi.calc(obj, 'a', 'b', b => b * 2)
// defi.set(obj, 'b', 3)
// defi.bindNode(obj, 'c', '.node');
*/
