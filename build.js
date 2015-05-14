var fs = require('fs'),
	less = require('less');

var config = {
	modules: [
		'unstrap-core'
	],
	components: [
		'dropdown'
	}
}

function joinFiles (file, list) {
	var p = new Promise(function (f) {f()});
	
	list.forEach(function (v, i, a) {
		p.then(function () {
			fs.readFile('components/' + v + '/' + v + '.js', function (err, data) {
				if (err) throw err;
				fs.appendFile(file, data, function (err) {
					if (err) throw err;
				})
			})
		})
		.catch(function (err) {
			console.log('We had an error.', err)
		})
	})
	
}

function compileLess (file, list) {
	var p = new Promise(function (f) {f()});

	var ws = fs.createWriteStream('css/unstrap.less');

	list.forEach(function (v) {
		
		fs.exists('less/' + v + '.less', function (exists) {
			if (exists) {
				fs.readFile('less/' + v + '.less', function (err, data) {
					p.then(function () {
						ws.write(data);
					})
				})	
			}
		})
	})


}

fs.truncate('dist/unstrap.css', 0, function () {
	//compileLess('dist/unstrap.css', config.modules);
})

fs.truncate('dist/unstrap.js', 0, function () {
	joinFiles('dist/unstrap.js', config.compontents);
});

fs.writeFile('dist/config.json', JSON.stringify(config, null, '  '));
