'use strict';
(function() {
	module.exports = {
		urls: [
			'https://google.com',
			'https://example.com',
		],
		viewports: ['mobile','tablet','desktop'],
		// devices: [],
		userAgents: ['chrome','firefox','safari','ie'],
		watch: false,
		savePathBase: './screenshots',
		saveDirName: Date.now().toString(),
		timeout: 30000,
	}
})()