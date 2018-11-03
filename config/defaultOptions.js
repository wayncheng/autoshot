'use strict';
(function() {

	const defaultOptions = {
		urls: [],
		viewports: ['mobile','desktop'],
		// devices: [],
		userAgents: ['chrome'],
		// userAgents: ['chrome','firefox','safari','ie'],
		watch: false,
		savePathBase: './screenshots',
		saveDirName: Date.now().toString(),
		timeout: 30000,
	}

	module.exports = defaultOptions
})()