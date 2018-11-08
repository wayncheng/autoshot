'use strict';
(function() {
	const path = require('path');
	const fs = require('fs');
	const puppeteer = require('puppeteer');
	const defaultOptions = require('./../config/defaultOptions');
	const {takeScreenshot} = require('./screenshot');
	const constants = require('./../config/constants');

	let userOpts = {
		// urls: [
		// 	'example.com',
		// 	'www.google.com',
		// 	'https://che.ng/portfolio',
		// 	'https://www.medium.com'
		// ]
		urls: [
			'https://reddit.com/r/nba',
			'https://reddit.com/r/corgi',
		]
	};

	const initDir = function(){
		// Get current time and format it so that it is safe to be used as a file name. (i.e. no slashes or colons, etc.)
		let d = new Date();
		let dateISO = d
			.toISOString()
			.slice(0, 10)
			.split("-")
			.join("");
		let time = d.toLocaleTimeString("en-US", { hour12: false });
		let fileTime = time.split(":").join("");
		let timestamp = dateISO + "_" + fileTime; // e.g. 20181010_123456

		// Take path defined in constants and create a new directory for this tests results
		const dirPath = path.resolve('./screenshots', timestamp);

		// Make Results Directory
		fs.mkdir(dirPath, err => {
			if (err) {
				fs.mkdirSync(path.resolve('./screenshots'), err => console.log('err:',err))
				fs.mkdirSync(dirPath,err => console.log(err))
			}
		})

		return dirPath;
	}
	
	const buildShotList = function(params) {
		// console.log('\n---- buildShotList --->')
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
					let noProtocol = url.split('://')[1];
					// let fsURL = url .replace('://', '.') .split(/[/?]+/g).join('.');
					let fsURL = noProtocol
								.split(/[/?:]+/g)
								.join('.');
					// fsURL = encodeURIComponent(url);
								
					let fileSafeName = `${fsURL}[${viewport},${userAgent}]`
					let savePath = path.resolve(params.savePathBase,fileSafeName);
					// let savePath = path.resolve( params.savePathBase );
					// params.savePath = savePath;
					// console.log('savePath:', savePath);

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

		// console.log(`shot list (${shotList.length})...`);
		// shotList.forEach(x => console.log('  ', JSON.stringify(x)));
		// console.log( '\n', JSON.stringify(shotList, null, 2) );

		return shotList;
	};

	
	fs.readFile('./config/urls.txt','utf8', (err,data) => {
		if (err) throw err;
		let newlinePattern = /[\n^\r]+/g;
		let urlArray = data.split(newlinePattern)
		// console.log('split:',split);
		userOpts.urls = urlArray
		
		autoshot(userOpts);
	})

	const autoshot = async function(userOptions) {
		// console.log('\n---- autoshot --->')
		// let shotList = [];
		let params = {
			...defaultOptions,
			...userOptions
		};
		// let savePath = path.resolve( params.savePathBase, params.saveDirName );
		// let savePath = path.resolve( params.savePathBase );
		let savePath = await initDir();
		// params.savePath = savePath;
		params.savePathBase = savePath;
		// console.log('savePath:', savePath);

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
			// headless: !params.watch || true,
			headless: true,
			slowMo: 0,
			// timeout: params.timeout || 30000,
			timeout: 30000,
			ignoreHTTPSErrors: true,
			// defaultViewport: params.viewports || constants.viewports.desktop,
		})
		.then(async browser => {
			const page = await browser.newPage();

			
			//========================================
			//  TAKE SCREENSHOT
			//========================================
			for (let i = 0; i < shotList.length; i++) {
				const shotSpec = shotList[i];

				let screenshotOptions = {
					path: shotSpec.path+'.png',
				}
				let viewport = shotSpec.viewport

				await page.goto(shotSpec.url)

				await takeScreenshot(page,screenshotOptions,viewport)
			}
			// shotList.forEach(async shotOptions => {
				
			// });
			//========================================


			await page.close();
			await browser.close();

			console.log('.... screenshots saved');
		})
		.catch(err => {
			console.log('.... error taking screenshots');
			throw err;
		});
	};
	


	// const screenshot = async ( page, screenshotOptions ) => {
	// 	console.log('screenshotOptions:',screenshotOptions)
	// 	const { url } = screenshotOptions;
	// 	await page.goto();
	// }







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
