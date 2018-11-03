'use strict';
(function() {
	const path = require('path');
	const fs = require('fs');
	const puppeteer = require('puppeteer');
	const defaultOptions = require('../config/defaultOptions');
	const {takeScreenshot} = require('./screenshot');
	const constants = require('../config/constants');

	let userOpts = {
		// urls: [
		// 	'example.com',
		// 	'www.google.com',
		// 	'https://che.ng/portfolio',
		// 	'https://www.medium.com'
		// ]
		urls: [
			'reddit.com/r/nba',
			'reddit.com/r/corgi',
		]
	};

	const autoshot = async function(userOptions) {
		console.log('\n---- autoshot --->')
		// let shotList = [];
		let params = {
			...defaultOptions,
			...userOptions
		};
		// let savePath = path.resolve( params.savePathBase, params.saveDirName );
		let savePath = path.resolve( params.savePathBase );
		params.savePath = savePath;
		console.log('savePath:', savePath);

		// Build Master Shot List ==========================================
		let shotList = await buildShotList(params);
		
		/* Example of shotList .................
			shotList = [
		 		{
		 			url: 'https://google.com/bing',
		 			viewport: 'desktop',
		 			userAgent: 'chrome',
		 			fileSafeName: 'https.google.com.bing [desktop,chrome]'
		 		},
		 		{
		 			url: 'https://google.com/bing',
		 			viewport: 'mobile',
		 			userAgent: 'chrome',
		 			fileSafeName: 'https.google.com.bing [mobile,chrome]'
		 		}
			]
		*/


		// Create save directory =========================================
		// savePath = 'C:\\Users\\w\\git\\autoshot\\screenshots\\reddit'
		// await fs.mkdir(savePath, err => {
		// 	if (err) console.log(err);
		// });



		await puppeteer
		.launch({
			headless: !params.watch || true,
			slowMo: 0,
			timeout: params.timeout || 30000,
			ignoreHTTPSErrors: true,
			defaultViewport: params.viewports || constants.viewports.desktop,
		})
		.then(async browser => {
			const page = await browser.newPage();

			
			//========================================
			//  TAKE SCREENSHOT
			//========================================
			for (let i = 0; i < shotList.length; i++) {
				const shotSpec = shotList[i];

				let screenshotOptions = {
					path,
				}
				let viewport = shotSpec.viewport

				await takeScreenshot(page,screenshotOptions,null)
			}
			// shotList.forEach(async shotOptions => {
				
			// });
			//========================================


			await page.close();
			await browser.close();
		})
		.catch(err => {
			throw err;
		});
	};
	
	
	const buildShotList = function(params) {
		console.log('\n---- buildShotList --->')
		const shotList = [];

		params.urls.forEach((url, i) => {
			let dataType = typeof url;

			if (dataType === 'string') {
				// shotList.push(url);
			} else if (
				url &&
				dataType === 'object' &&
				url.constructor === Object &&
				url !== Math
			) {
				// If an object ...........
				console.log('OBJECT!!!!!!!!!!!!!!!!!!!!!!!!!!');
				url = 'object.com';
			}

			// For each URL, test in all combos of all environments

			params.viewports.forEach(viewport => {
				params.userAgents.forEach(userAgent => {
					
					let fsURL = url
								.replace('://', '.')
								.split('/')
								.join('.');
					let fileSafeName = `${fsURL} [${viewport},${userAgent}]`
					let savePath = path.resolve(params.savePathBase,fileSafeName);
					// let savePath = path.resolve( params.savePathBase );
					// params.savePath = savePath;
					console.log('savePath:', savePath);

					let spec = {
						url,
						viewport,
						userAgent,
						fileSafeName,
						path: savePath,
					};

					shotList.push(spec);
				});
			});
		});

		console.log(`shot list (${shotList.length})...`);
		shotList.forEach(x => console.log('  ', JSON.stringify(x)));
		// console.log( '\n', JSON.stringify(shotList, null, 2) );

		return shotList;
	};




	// const screenshot = async ( page, screenshotOptions ) => {
	// 	console.log('screenshotOptions:',screenshotOptions)
	// 	const { url } = screenshotOptions;
	// 	await page.goto();
	// }







	autoshot(userOpts);
})();

/*

https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#browseruseragent
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#browsercontextoverridepermissionsorigin-permissions

chromium flags (go in args): 
https://peter.sh/experiments/chromium-command-line-switches/

*/

// const shotList = [];
// params.urls.forEach( url => {
// 	params.viewports.forEach( viewport => {
// 		params.userAgents.forEach( userAgent => {

// 			let spec = {
// 				url,
// 				viewport,
// 				userAgent,
// 			}

// 			shotList.push(spec)

// 		})
// 	})
// })
// console.log(`shot list (${shotList.length})...`)
// shotList.forEach( x => console.log('  ',JSON.stringify(x)) )
// console.log('shotList\n',JSON.stringify(shotList, null, 2))
