/*
 * Unstrap v1.0.0-1
 * http://unstrap.org/components/dropdown
 * 2015
 * MIT license
 */
(function (global) {


	var version = '1.0.0',
	    collection = {};

	function onReady (func) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            doNext(func);
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', func, false);
        } else {
            document.attachEvent('onreadystatechange', func);
        }
    }

	function extendUnstrap (v) {
	    var list = document.querySelectorAll(collection[v].selectors[0]);
	    for (var i = 0; i < list.length; i++) {
	        collection[v].extend(list.item(i));
	    }
	}

	onReady(function () {
	    var observer = new MutationObserver(function (mut) {
	        mut.forEach(function (m) {
	            var n = m.addedNodes,
	                f;
	            for (var i=0; i<n.length; i++) {
	                var c = n.item(i).classList;
	                if (c) {
	                	for (var j = 0; j < c.length; j++) {
	                    	if (f = collection[c.item(j)]) {
	                        	f.extend(n.item(i));
	                    	}
	                	}
	            	}
	            }
	        });
	    });
	    Object.keys(collection).forEach(function (v) {
	        extendUnstrap(v);
	    })
	    observer.observe(document.body, {childList: true, subtree: true});
	});

	function define (a, b, c) {
		if (typeof a === 'function') {
			c = a;
		}

		var m = c();
		collection[m.name] = m;

	}

	// dropdown
	define(function () {

		function caret () {
			var c = document.createElement('span');
			c.classList.add('caret');
			return c;
		}

		function extend (elem) {
			var but = elem.querySelector('.dropdown-toggle');
			if (!but) return;
			Object.defineProperty(but, 'value', {
				set: function (val) {
					var v, li = this.nextElementSibling.querySelectorAll('li');
					for (var i = 0; i < li.length; i++) {
						v = li.item(i).getAttribute('data-value') || li.item(i).textContent;
						if (val === v) {
							but._value = val;
							but.textContent = li.textContent || val;
							but.appendChild(caret());
						}
					}
				},
				get: function () {
					 return but._value;
				}
			});
			but.nextElementSibling.addEventListener('click', function (evt) {
				but.value = evt.target.getAttribute('data-value') || evt.target.textContent;
				evt.target.parentNode.parentNode.parentNode.classList.remove('open');
			})
			but.addEventListener('click', function (evt) {
				var dd = evt.target.parentNode;
				dd.classList.toggle('open');
			})
			return elem;
		}

		return {
			version: '1.0.0',
			name: 'dropdown',
			selectors: ['.dropdown'],
			extend: extend
		}
	});

	return {
		version: version
	}

}(window))