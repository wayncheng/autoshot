'use strict';
(function(){

	const screenshot = async ( page, screenshotOptions ) => {
		console.log('screenshotOptions:',screenshotOptions)
		const { url } = screenshotOptions;
		await page.goto();
	}

	module.exports = screenshot;
})();