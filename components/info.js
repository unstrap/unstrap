/*
 * unstrap-info
 */
(function () {

	window.unstrap.collection['unstrap-info'] = {
		version: '1.0.0',

		render: function (element) {
			var e = $$$('h1', 'test');
			var el = $$$(element).css({color:'green'});
			el.ins(['h3', 'Info']);
		}
	}

}())
