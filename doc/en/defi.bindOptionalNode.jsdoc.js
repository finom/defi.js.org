/**
@function defi.bindOptionalNode
@module defi/bindoptionalnode
@summary Works just the same as {@link defi.bindNode} but it does not throw an exception if the ``node`` argument is an empty array, ``undefined`` or non-existent.

@see {@link defi.bindNode}
@example
defi.bindOptionalNode(obj, 'myKey', '.my-element');
*/
