# node-remove-log
node module for removing console.* calls from source code. input js code as string or path and output the code without console calls.
this module uses falafel to walk the AST tree.

## usage

const removeLogs = require("remove-logs");
removeLogs.removeFromPath("/somepath.js", (err, modifiedSrc) => {
	//modifiedSrc is the source code without console calls
});

removeLogs.removeFromString("var x = 1; console.log('test');", (err, modifiedSrc) => {
	//modifiedSrc is the source code without console calls
});

## customization
if you wish to leave console calls in the output code leave a comment `//include` at the end of the console call. for example:

```javascript
console.log("this line will be removed");
console.log("this line will not be removed"); //include
```