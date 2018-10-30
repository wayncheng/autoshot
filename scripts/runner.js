'use strict';
(function(){
	const path = require('path');
	const fs = require('fs');
	const puppeteer = require('puppeteer');
	const params = require('../config/params');
	const screenshot = require('./screenshot');
	const constants = require('../config/constants');
	
	let savePath;
	


	savePath = path.resolve(path.join(params.savePathBase,params.saveDirName))
	console.log('savePath:',savePath)	
	
	fs.mkdir(savePath, (err) => {
		if(err) console.log(err);	
	})

	//* Build Master Shot List =====================
	const shotList = [];
	
	params.urls.forEach( url => {
		params.viewports.forEach( viewport => {
			params.userAgents.forEach( userAgent => {

				let spec = {
					url,
					viewport,
					userAgent,
				}
				
				shotList.push(spec)

			})
		})
	})
	console.log('# of shots:',shotList.length)
	// console.log('shotList\n',JSON.stringify(shotList, null, 2))
	
	// puppeteer
	// .launch({
	// 	headless: !params.watch || true,
	// 	slowMo: 0,
	// 	timeout: params.timeout || 30000,
	// 	ignoreHTTPSErrors: true,
	// 	defaultViewport: params.viewports || [constants.viewports.desktop],
	// })
	// .then(async browser => {
	// 	const page = await browser.newPage();


	// 	await screenshot(page,options)


	// 	await page.close();
	// 	await browser.close();
	// })
	// .catch(err => {
	// 	throw err;
	// });


})();

/*

https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#browseruseragent
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#browsercontextoverridepermissionsorigin-permissions

chromium flags (go in args): 
https://peter.sh/experiments/chromium-command-line-switches/

*/
