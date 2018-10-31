'use strict';
(function() {
	const path = require('path');
	const fs = require('fs');
	const puppeteer = require('puppeteer');
	const params = require('../config/params');
	const screenshot = require('./screenshot');
	const constants = require('../config/constants');

	let savePath;

	savePath = path.resolve(path.join(params.savePathBase, params.saveDirName));
	console.log('savePath:', savePath);

	fs.mkdir(savePath, err => {
		if (err) console.log(err);
	});

	//* Build Master Shot List =====================

	params.urls.forEach( (url,i) => {
		let type = typeof url;
		let finalURL;
		// console.log('type:', type);
		// let isObject = false;
		// try {
		// 	// let base = url.domain;
		// 	if (url && type === 'object' && url.constructor === Object && url !== Math)
		// 		isObject = true
		// }
		// catch (e){
		// 	console.log('------------------');
		// }
		// finally {
		// 	console.log('isObject:',isObject)
		// }

		if (url && type === 'object' && url.constructor === Object && url !== Math )
			console.log(i)
		

		// function isObject(value) {
		// 	return value && typeof value === 'object' && value.constructor === Object;
		// }
		/ console.log('isObject(url):                                 
		// console.log('(url === null):',(url === null))
		// console.log('(Math === null):',(Math === null))

		// if (type === 'object' && Array.isArray(url)){
		// 	type = 'array'
		// }
		// console.log('type:',type)

		// if ( Array.isArray(url) ){
		// 	finalURL = url.join('/')
		// }
		// else if ( type === 'object' ){
		// 	let output = '';
		// 	let {protocol,env,domain,path} = url;

		// 	if (protocol)
		// 		output += protocol += '://';
		// 	if (env)
		// 		output += env += '.';
		// 	output += domain;
		// 	output += path;

		// 	finalURL = output;
		// }
		// else if (type === 'string'){
		// 	finalURL = url
		// }
		// else {
		// 	console.log('yo wtf is this url?')
		// }
		// console.log('finalURL:',finalURL)
	});
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
