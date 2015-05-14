define(['tripledollar'], function ($$$) {

    // simple private DOM constructor
	function element (name, attr, content) {
		var el = document.createElement(name);
		Object.keys(attr).forEach(function (at) {
			el.setAttribute(at, attr[at]);
		});
		if (content) {
            if (typeof content === 'string') {
                el.appendChild(document.createTextNode(content));
            } else {
                el.appendChild(content);
            }
        }
		return el;
	}

	function open () {        
        //var backdrop = $$$('div.modal-backdrop.fade.out');
        var backdrop = element('div', {'class': 'modal-backdrop fade.out'});
        document.body.appendChild(backdrop);
        backdrop.classList.toggle('out');
        backdrop.classList.toggle('in');
        // setTimeout(function () {
        //     var modal = document.querySelector('#myModal');
        //     modal.style.display = 'block';
        //     modal.classList.remove('fade');
        //     modal.classList.toggle('in');
        // }, 500)

    }

    function close () {
        var backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.classList.toggle('in');
            backdrop.classList.toggle('out');
            setTimeout(function () {
                document.body.removeChild(backdrop);
            }, 1000);
        }
        // var modal = document.querySelector('#myModal');
        // modal.classList.add('fade');
        // modal.style.display = 'none';
    }

	function apply (elem) {

        var button = elem || document.querySelector('.btn-primary');
        button.evt('click', function () {        
            var backdrop = $$$('div.modal-backdrop.fade.out');
            $$$.appendToDoc(backdrop);
            backdrop.classList.toggle('out');
            backdrop.classList.toggle('in');
            setTimeout(function () {
                var modal = document.querySelector('#myModal');
                modal.style.display = 'block';
                modal.classList.remove('fade');
                modal.classList.toggle('in');
            }, 500)

        });
        var modal = document.querySelector('#myModal');
        var close = modal.query('.close');
        close.evt('click', function () {
            var backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.classList.toggle('in');
                backdrop.classList.toggle('out');
                setTimeout(function () {
                    document.body.removeChild(backdrop);
                }, 1000);
            }
            var modal = document.querySelector('#myModal');
            modal.classList.add('fade');
            modal.style.display = 'none';
        })
	}

	function create () {
		var modal;
		return {
			open: open,
			close: close
		}
	}


	return {
		version: '1.0.0',
		selectors: [],
		create: create
	}
})
