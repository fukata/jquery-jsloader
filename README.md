# What's this
"jsloader" jQuery is a plugin, script synchronously and asynchronously and can be loaded.

## Dependences
* jQuery

## Usage
	// load async javascript
	$.jsloader.load('./example.js');
	// load sync javascript
	$.jsloader.load('./example.js', {async:false});

## Options
* async: boolean
 * script that specifies whether to load asynchronously and synchronously.
