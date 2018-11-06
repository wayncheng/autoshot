'use strict';
(function(){
	const constants = require('../config/constants');
	// const defaultOptions = require('../config/defaultOptions')
	
	// let screenshotPath = path.join(print.dirPath, `${reportType}_${reportNumber}_screenshot.png`)
	const defaultViewport = constants.viewports.desktop;

	
	const takeScreenshot = ( async ( page, shotSpecs,viewport ) => {
		console.log('\n---- takeScreenshot --->')
			let viewportOptions = defaultViewport;
			// let viewportOptions = constants.viewports[viewport] || defaultViewport;
			// if (viewport && constants.viewports[viewport]){
			if (viewport && constants.viewports[viewport]){
				viewportOptions = constants.viewports[viewport]
				await page.setViewport(viewportOptions)
			}
		
			// console.log('shotSpecs:',shotSpecs)

			const bodyHeight = await page.$eval('body', el => el.scrollHeight);
			const bodyWidth = await page.$eval('body', el => el.offsetWidth);
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
				console.log('noice')
			})
		})

	module.exports = {
		takeScreenshot,
	};
})()