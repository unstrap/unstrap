/*
 * unstrap v1.1.3
 * https://unstrap.org
 * 2015-2020
 * MIT license
 */
const version = '1.1.3',
    collection = {};

function extendUnstrap (v) {
    var list;
    if (!collection[v].selectors) {
    	collection[v].selectors = ['.' + collection[v].name];
    }
    collection[v].selectors.forEach(function (sel) {
    	list = document.querySelectorAll(sel);
    	for (var i = 0; i < list.length; i++) {
        	collection[v].extend && collection[v].extend(list.item(i));
    	}
	})
}

function init () {
    var observer = new MutationObserver(function (mut) {
        mut.forEach(function (m) {
            var n = m.addedNodes,
                f;
            for (var i=0; i<n.length; i++) {
                var c = n.item(i).classList;
                if (c) {
                	for (var j = 0; j < c.length; j++) {
                    	if (f = collection[c.item(j)]) {
                        	f.extend && f.extend(n.item(i));
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
}

function register (...components) {
	components.forEach((component) => {
		if (component.name) {
	    	collection[component.name] = component;
	    }
	})
}

function unregister (...components) {
	components.forEach((component) => {
    	delete collection[component.name];
    })
}

function list () {
    return Object.keys(collection).sort();
}

window.onload = init;

export default {
	version,
	register,
    unregister,
    list
}