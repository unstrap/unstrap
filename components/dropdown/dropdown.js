/*
 * Unstrap: dropdown.js v1.0.0-1
 * http://unstrap.org/components/dropdown
 * 2015
 * MIT license
 */
define(function () {

	function caret () {
		var c = document.createElement('span');
		c.classList.add('caret');
		return c;
	}

	function extend (elem) {
		var but = elem.querySelector('.dropdown-toggle');
		Object.defineProperty(but, 'value', {
			set: function (val) {
				var li = but.nextSibling.querySelector('[data-value=' + val +']');
				if (li) {
					but._value = val;
					but.textContent = li.textContent || val;
					but.appendChild(caret());
				}
			},
			get: function () {
				 return but._value;
			}
		});
		but.nextSibling.evt('click', function (evt) {
			but.value = evt.target.getAttribute('data-value') || evt.target.textContent;
			evt.target.parentNode.parentNode.parentNode.classList.remove('open');
		})
		but.evt('click', function (evt) {
			var dd = evt.target.parentNode;
			dd.classList.toggle('open');
		})
		return elem;
	}

	return {
		version: '1.0.0',
		name: 'dropdown',
		selectors: ['.bs.dropdown', '.us.dropdown'],
		extend: extend
	}
})
