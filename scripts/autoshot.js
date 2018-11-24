'use strict';
(function() {
	const path = require('path');
	const fs = require('fs');
	const puppeteer = require('puppeteer');
	// const { takeScreenshot } = require('./screenshot');
	const constants = require('./../config/constants');

	// const defaultOptions = {
	// 	urls: [],
	// 	viewports: ['mobile','desktop'],
	// 	// devices: [],
	// 	userAgents: ['chrome'],
	// 	// userAgents: ['chrome','firefox','safari','ie'],
	// 	watch: false,
	// 	savePathBase: './screenshots',
	// 	timeout: 30000,
	// }
	// const defaultViewport = constants.viewports.desktop;

	let params = {
		urls: [],
		timestamp: '',
		dirPath: '',
		shotList: [],
		savedFiles: [],

		fileType: 'png',
		viewports: [ 'mobile', 'desktop' ],
		userAgents: [ 'chrome' ],
		savePathBase: '' // e.g ./screenshots/20181111_1230
		// watch: false,
		// timeout: 30000,
		// devices: [],
	};
	//+ initDir ====================================================
	function initDir() {
		console.log('.... creating save directory');

		// Get current time and format it so that it is safe to be used as a file name. (i.e. no slashes or colons, etc.)
		let d = new Date();
		let dateISO = d.toISOString().slice(0, 10).split('-').join('');
		let time = d.toLocaleTimeString('en-US', { hour12: false });
		let fileTime = time.split(':').join('');
		let timestamp = dateISO + '_' + fileTime; // e.g. 20181010_123456
		params.timestamp = timestamp;

		// path to save directory where screenshots will be saved
		const dirPath = path.resolve('./screenshots', timestamp);
		params.dirPath = dirPath;

		// make save dir
		fs.mkdir(dirPath, (err) => {
			// if the screenshots folder doesn't exist, create that folder first, then create save dir
			if (err) {
				fs.mkdir(path.resolve('./screenshots'), (err) => {
					console.log('err:', err);
					fs.mkdir(dirPath, (err) => console.log(err));
				});
			}

			return dirPath;
		});
	}

	//+ buildShotList ===============================================
	function buildShotList(params) {
		console.log('.... building shot list');
		const shotList = [];

		params.urls.forEach((url, i) => {
			// if ( url && dataType === 'object' && url.constructor === Object && url !== Math ) { }

			// For each URL, test in all combos of all environments
			params.viewports.forEach((viewport) => {
				params.userAgents.forEach((userAgent) => {
					let noScheme = url.split('://')[1];
					let fsURL = noScheme.split(/[/?:]+/g).join('.');

					let fileSafeName = `${fsURL} (${viewport})`;
					let savePath = path.resolve(params.dirPath, fileSafeName);
					// let savePath = path.resolve( params.savePathBase );
					// params.savePath = savePath;
					// console.log('savePath:', savePath);

					let spec = {
						url,
						viewport,
						userAgent,
						fileSafeName,
						path: savePath
					};

					shotList.push(spec);
				});
			});
		});

		// console.log(`shot list (${shotList.length})...`);
		// shotList.forEach(x => console.log('  ', JSON.stringify(x)));
		// console.log( '\n', JSON.stringify(shotList, null, 2) );

		params.shotList = shotList;
		return shotList;
	}

	//+ autoshot ====================================================
	const autoshot = async (options) => {
		console.log('\n---- autoshot --->');

		// combine custom options with the default options
		params = {
			...params,
			...options
		};

		// create save dir .................................
		let savePath = await initDir();
		params.savePathBase = savePath;

		// generate shot list ..............................
		let shotList = await buildShotList(params);

		// LAUNCH PUPPETEER ________________________________
		await puppeteer
			.launch({
				headless: true,
				slowMo: 0,
				ignoreHTTPSErrors: true,
				timeout: 30000
				// defaultViewport: constants.viewports.desktop,
			})
			.then(async (browser) => {
				let page = await browser.newPage();
				let currentURL = '';

				// Take ALL screenshots --------------------
				for (let i = 0; i < shotList.length; i++) {
					const shotSpec = shotList[i];

					// URL Navigation ..................
					// - if the shot's target URL is different from the current URL,
					//   navigate to the new target URL and update currentURL afterwards.
					if (shotSpec.url !== currentURL) {
						await page.goto(shotSpec.url);
						currentURL = shotSpec.url;
					}

					// set options
					let screenshotOptions = {
						path: shotSpec.path + '.' + params.fileType
					};

					// take screenshot
					await takeScreenshot(page, screenshotOptions, shotSpec.viewport);
				}
				
				// close everything
				await page.close();
				await browser.close();

				console.log('.... screenshots saved');
				return params.savedFiles;
			})
			.catch((err) => {
				console.log('.... error taking screenshots');
				throw err;
			});
	}

	//+ takeScreenshot ====================================================

	async function takeScreenshot(page, screenshotOptions, viewport) {
		console.log('---- screenshot --->');

		// Set Viewport ..................
		let viewportOptions = constants.viewports.desktop;
		if (viewport && constants.viewports[viewport]) {
			viewportOptions = constants.viewports[viewport];
			await page.setViewport(viewportOptions);
		}

		// Get Page Dimensions ....................
		const bodyHeight = await page.$eval('body', (el) => el.scrollHeight);
		const bodyWidth = await page.$eval('body', (el) => el.offsetWidth);

		// Trigger Lazy Load ..................
		await page.$eval('body', () => { window.scrollTo(0, bodyHeight); });
		await page.waitFor(2000);
		await page.$eval('body', () => { window.scrollTo(0, 0); });

		// Override default opts with custom opts .............
		const defaultPuppeteerScreenshotOptions = {
			type: 'png',
			path: undefined,
			fullPage: false,
			clip: {
				x: 0,
				y: 0,
				width: bodyWidth,
				height: bodyHeight
			}
		};
		let shotOptions = {
			...defaultPuppeteerScreenshotOptions,
			...screenshotOptions
		};

		//> Actually Take Screenshot in Puppeteer ========================
		await page.screenshot(shotOptions, function(err) {
			if (err) throw err;
			
			params.savedFiles.push(shotOptions.path)
		});
	}

	module.exports = autoshot;

	/* Example of shotList .................
		shotList = [
			{
				url: 'https://google.com',
				viewport: 'desktop',
				userAgent: 'chrome',
				fileSafeName: 'https.google.com.bing [desktop,chrome]'
			},
			{
				url: 'https://google.com',
				viewport: 'mobile',
				userAgent: 'chrome',
				fileSafeName: 'https.google.com.bing [mobile,chrome]'
			}
		]
	*/
})();

/*

https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#browseruseragent
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#browsercontextoverridepermissionsorigin-permissions

chromium flags (go in args): 
https://peter.sh/experiments/chromium-command-line-switches/

*/
