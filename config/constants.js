'use strict';
(function() {
	const viewports = {
		// + Most Popular Viewports ..................

		mobile: {
			// Most common mobile res (41% of mobile screens worldwide, 22% of all screens worldwide)
			width: 360,
			height: 640,
			isMobile: true,
			hasTouch: true
		},
		desktop: {
			// Most common desktop res (29% worldwide)
			width: 1366,
			height: 768,
			isMobile: false,
			hasTouch: false
		},
		tablet: {
			// Most common tablet res (58% worldwide). Used by all iPads besides iPad Pro
			width: 768,
			height: 1024,
			isMobile: true,
			hasTouch: true
		},

		// + iPhones ..................

		iphone: {
			// iPhone 6,6s,7,8
			width: 375,
			height: 667,
			isMobile: true,
			hasTouch: true
		},
		iphoneX: {
			// iPhone X, XS
			width: 375,
			height: 812,
			isMobile: true,
			hasTouch: true
		},
		iphoneMax: {
			// iPhone XS Max, XR
			width: 414,
			height: 896,
			isMobile: true,
			hasTouch: true
		},
		iphonePlus: {
			// iPhone Plus Line
			width: 414,
			height: 736,
			isMobile: true,
			hasTouch: true
		},
		iphoneOld: {
			// iPhone 5, iPod Touch
			width: 320,
			height: 568,
			isMobile: true,
			hasTouch: true
		},

		// + iPads ....................

		ipadPro: {
			// iPad Pro
			width: 1024,
			height: 1366,
			isMobile: true,
			hasTouch: true
		},
		ipad: {
			// iPads (all non-pro)
			width: 768,
			height: 1024,
			isMobile: true,
			hasTouch: true
		},

		// + Desktops ..................

		desktop_1080: {
			// 1080p Desktop
			width: 1920,
			height: 1080,
			isMobile: false,
			hasTouch: false
		},

		desktop_1440: {
			// 1440p Desktop
			width: 2560,
			height: 1440,
			isMobile: false,
			hasTouch: false
		},
		desktop_4k: {
			// 4k Desktop
			width: 3940,
			height: 2160,
			isMobile: false,
			hasTouch: false
		}
	};
	module.exports = {
		viewports,
	};
})();
