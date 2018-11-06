'use strict';
(function() {
	const program = require('commander');

	program.version('0.1.0').description('Automated Screenshots');

	// program
	// 	.arguments('<file>')
	// 	.option('-u, --url <url>', 'the URL to take screenshots of')
	// 	.option(
	// 		'-d, --devices <devices>',
	// 		'list of devices to emulate for screenshot'
	// 	)
	// 	.action(function(file) {
	// 		console.log('url: %s devices: %s', program.url, program.devices);
	// 	})
	// 	.parse(process.argv);

	// program
	// .option('-u,--url <url>', 'URL to take screenshots of')
	// .option('-d,--devices [devices]>', 'Devices to emulate for screenshot' )
	// .option('-w,--watch', 'Show the process (not headless)')

	program
		// .command('captureScreens <url> <devices> <watch>')
		// .command('captureScreens <url> <devices> <watch>')
		.command('captureScreens')
		.usage('<url> [options]')
		.description('Capture Screenshots')
		.alias('capture')
		.option('-u,--url <url>', 'URL to take screenshots of')
		.option('-w,--watch', 'Show the process (not headless)')
		.option('-d,--devices [devices]>', 'Devices to emulate and capture' )
		.option('-v,--viewport [viewport]>', 'Viewports to emulate and capture' )
		// .action( function(url, devices, watch){
		.action( function(options){
			console.log('\n---> captureScreens\n');
			// console.log('options:',options)
			// console.log('this:',this)

			let {url,devices,watch} = options
			console.log('url:', url);
			console.log('devices:', devices);
			console.log('watch:', watch);
		});

	program.parse(process.argv);

	console.log('\n.... done\n');
})();
