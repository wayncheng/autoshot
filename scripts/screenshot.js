'use strict';
(function(){
	const constants = require('../config/constants');
	// const defaultOptions = require('../config/defaultOptions')
	
	// let screenshotPath = path.join(print.dirPath, `${reportType}_${reportNumber}_screenshot.png`)
	const defaultViewport = constants.viewports.desktop;

	
	const takeScreenshot = ( async ( page, shotSpecs,viewport ) => {
		console.log('---- screenshot --->')
			let viewportOptions = defaultViewport;
			// let viewportOptions = constants.viewports[viewport] || defaultViewport;
			// if (viewport && constants.viewports[viewport]){
			if (viewport && constants.viewports[viewport]){
				viewportOptions = constants.viewports[viewport]
				await page.setViewport(viewportOptions)
			}
		
			// console.log('shotSpecs:',shotSpecs)

			const bodyHeight = await page.$eval('body', el => {
				// scroll to bottom to trigger lazy loads, then scroll back to top.
				window.scrollTo(0,el.scrollHeight)
				return el.scrollHeight
			});
			const bodyWidth = await page.$eval('body', el => el.offsetWidth);

			// await window.scrollTo(0,bodyHeight);
			// await page.evaluate(_viewportHeight => {
			// 	window.scrollBy(0, _viewportHeight);
			//   }, viewportHeight);
			//   await page.evaluate( () => {
			// 	window.scrollTo(0, bodyHeight);
			//   });

			await page.waitFor(3000);
			await page.$eval('body', () => {
				window.scrollTo(0,0)
			})

			const defaultScreenshotOptions = {
				type: 'png',
				path: undefined,
				// fullPage: true,

				fullPage: false,
				clip: {
					x: 0,
					y: 0,
					width: bodyWidth,
					height: bodyHeight,
				}
			}
			let shotOptions = {
				...defaultScreenshotOptions, 
				...shotSpecs
				
			}; 
			
	
			// > Take Screenshot
			await page.screenshot(shotOptions, function(err){
				if (err) throw err;
			})
		})

	module.exports = {
		takeScreenshot,
	};
})()