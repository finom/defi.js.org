/**
@method defi.chain
@module matreshka/chain
@importance 2
@since 2.0
@summary Allows chained calls of universal methods

@desc The function accepts any object and returns an instance of externally inaccessible class which adopts universal methods allowing them to be called in a chain to change given object.

> Universal method is a method which exist at {@link Matreshka} prototype and have a static alternative (e. g. {@link defi.bindNode} and {@link defi.bindNode})

@param {object|function} object - An object
@returns {object} An instance of the class which adopts universal methods

@example
const object = {};
defi.chain(object)
    .calc('a', 'b', b => b * 2)
    .set('b', 3)
    .bindNode('c', '.node');

// the same as
// defi.calc(object, 'a', 'b', b => b * 2)
// defi.set(object, 'b', 3)
// defi.bindNode(object, 'c', '.node');

*/
