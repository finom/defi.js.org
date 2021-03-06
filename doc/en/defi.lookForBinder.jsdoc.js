/**
@function defi.lookForBinder
@module defi/lookforbinder
@desc > Skip this section if you're using **defi-react** because React handles DOM rendering by its own.

Returns a binder corresponding to an element. If it is not found, it returns ``undefined``. The function uses {@link defi.defaultBinders} for the search.
@see {@link defi.bindNode}
@see {@link defi.defaultBinders}
@param {node} node
@returns {binder} binder
@example
const element = document.createElement('input');
element.type = 'text';

console.log(defi.lookForBinder(element));

// will return something similar to the following object
{
	on: 'input',
	getValue: ({ node }) => node.value,
	setValue: (v, { node }) => node.value = v,
}
*/
