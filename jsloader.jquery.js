/*
# JavaScript Loader jQuery plugin
version: 1.2.0
author: tatsuya.fukata
mail: tatsuya.fukata@gmail.com
site: http://fukata.org 

# License
Copyright 2011 Tatsuya Fukata.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

# Usage
## load local javascript
// async
$.jsloader.load('./example.js');

// sync
$.jsloader.load('./example.js', {async:false});

## load remote javascript
// async
$.jsloader.load('http://example.com/example.js');

// sync
$.jsloader.load('http://example.com/example.js', {async:false});

# ChangeLog
- v1.0.0 initial
- v1.1.0 bug fixed: Synchronous mode, or more correctly 2 script can not load.
- v1.2.0 bug fixed: Add loaded readyState.
*/

;(function($){
function JsLoader() {
	this.scripts = [];
}
JsLoader.prototype._create_script = function(src) {
	console.log(src);
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        s.initialized = false;
	return s;
}
JsLoader.prototype._add_script = function(head,src) {
	var s = this._create_script(src);
	head.appendChild(s);
}
JsLoader.prototype._load_async = function(head,src_list,options) {
	for (var i=0; i<src_list.length; i++) {
		this._add_script(head,src_list[i]);
	}
}
JsLoader.prototype._load_sync = function(head,src_list,options) {
	for (var i=0; i<src_list.length; i++) {
		var s = this._create_script(src_list[i]);
		s.idx = i;
		this.scripts.push(s);
	}
	var loader = this;
        for (var i=0; i<this.scripts.length-1; i++) {
        	var s = this.scripts[i];
                s.onload = function(){
                        if(this.initialized) return;
                        this.initialized = true;
                        head.appendChild(loader.scripts[this.idx+1]);
                };
                s.onreadystatechange = function() {
                        if(this.initialized) return;
                        if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.initialized = true;
                                head.appendChild(loader.scripts[this.idx+1]);
                        }
                };
                s = this.scripts[i+1];
        }
        head.appendChild(this.scripts[0]);
}
JsLoader.prototype.load = function(src,options) {
	options = $.extend({
		'async':true
	},options);
	var head = document.getElementsByTagName('head')[0];
	if (!$.isArray(src)) {
		this._add_script(head,src);
		return;
	}
	var src_list = src;
	if (options.async) {
		this._load_async(head,src_list,options);
	} else {
		this._load_sync(head,src_list,options);
	}
}
$.jsloader = new JsLoader();
})(jQuery);
