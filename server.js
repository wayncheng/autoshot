'use strict';

(function() {
	// DEPENDENCIES ===================================
	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	require('dotenv').config();

	const autoshot = require('./scripts/autoshot');

	// CONFIG =======================================
	const app = express();
	const PORT = process.env.PORT || 5000;
	app.disable('x-powered-by');

	// Set Static Directory
	app.use(express.static(path.join(__dirname, 'public')));

	// Set Body Parser
	app.use(bodyParser.json());
	app.use(bodyParser.text());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

	// Sets access control headers
	app.use((req, res, next) => {
		console.log('>', req.url);
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	// ROUTES ======================================================
	app.post('/api/run', async (req,res) => {
		let {urls} = req.body;
		console.log('urls:',urls);
		let options = {
			urls: urls,
		}
		console.log('options:',options);
		await autoshot(options)
		// let savedFiles = await autoshot(options)

		await res.json({
			status: 'ok',
			urls: urls,
			// data: savedFiles,
		})
	})

	app.get('/api/ping', (req,res) => {
		// res.json({
		// 	status: 'ok',
		// 	data: 'pong'
		// })
		res.send('connected')
	})
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, 'public', 'index.html'));
	});

	// START SERVER ===================================
	const server = app.listen(PORT, () => console.log('----------------------- @ ' + PORT));

	module.exports = server; // Export for testing
})();
