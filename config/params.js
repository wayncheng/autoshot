'use strict';
(function() {
	module.exports = {
		urls: [
			'https://google.com',
			['www.example.com','what','is','up'],
			{
				protocol: 'https',
				env: 'www',
				domain: 'che.ng',
				path: '/path-to-whatever'
			},
			2312,
			undefined,
			null,
			Math,
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