/*
 * Unstrap: dropdown.js v1.0.0-2
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
		selectors: ['.dropdown', '.dropup'],
		extend: extend
	}
});
