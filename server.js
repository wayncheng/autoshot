'use strict';

(function() {
	// DEPENDENCIES ===================================
	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	const fs = require('fs');
	const Zip = require('adm-zip');
	// require('dotenv').config();

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
		res.header('Access-Control-Allow-Methods', 'GET/POST');
		// res.header('Access-Control-Allow-Methods', 'POST,GET');
		next();
	});

	// ROUTES ======================================================
	app.post('/api/run', async (req, res) => {
		let { urls } = req.body;

		let response = await autoshot(urls);

		await res.json({
			status: 'ok',
			urls: urls,
			downloadID: response,
			// data: response
		});
	});

	app.get('/api/download/:downloadID', (req, res) => {
		const { downloadID } = req.params;
		// console.log('downloadID:', downloadID);
		// let filePath = path.resolve('./screenshots',downloadID)
		// console.log('filePath:',filePath);
		const zipName = `autoshot_${downloadID}.zip`;
		const dirPath = path.resolve('./screenshots', downloadID);
		const zipPath = path.resolve('./screenshots/zips',zipName);
		// Build Zip
		const zip = new Zip();

		fs.readdir(dirPath, { withFileTypes: true }, async function(err, files) {
			if (err) throw err;

			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				let filePath = path.join(dirPath, file.name);
				// console.log('file.name:', file.name);
				// console.log('filePath:', filePath);

				await zip.addLocalFile(filePath);
			}

			// Save zip file
			await zip.writeZip(zipPath);

			await res.download(zipPath, 'screenshots.zip', function(err) {
				if (err) {
					console.log('err:', err);
				}
				else {
					console.log('download success');
				}
			});

			// await res.send('download completed')
		});
		// add file directly
		// let content = 'inner content of the file';
		// zip.addFile('test.txt', Buffer.alloc(content.length, content), 'entry comment goes here');
		// zip.addLocalFile('/home/me/some_picture.png'); // add local file
		// var willSendthis = zip.toBuffer(); // get everything as a buffer
		// zip.writeZip(/*target file name*/ '/home/me/files.zip'); // or write everything to disk
	});

	app.get('/api/ping', (req, res) => {
		// res.json({
		// 	status: 'ok',
		// 	data: 'pong'
		// })
		res.send('connected');
	});
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, 'public', 'index.html'));
	});

	// START SERVER ===================================
	const server = app.listen(PORT, () => console.log('----------------------- @ ' + PORT));

	module.exports = server; // Export for testing
})();
