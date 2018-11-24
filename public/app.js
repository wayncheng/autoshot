$(document).ready(function() {
	$('#submit').on('click', function(event) {
		event.preventDefault();

		var urls = $('#urls').val().trim();
		var urlArray = urls.split(/[\n\r]/g);
		// console.log('urlArray:', urlArray);

		postData(urlArray)
	});


	// $('#ping').on('click',function(event){
	// 	event.preventDefault();
	$.ajax({
		type: 'GET',
		url: '/api/ping'
	}).done(function(res) {
		console.log(res);
	});
	// })



	// var sample = [
	// 	'https://www.google.com',
	// 	'https://che.ng/portfolio',
	// 	'example.com',
	// 	'www.reddit.com',
	// 	'http://fortnite.che.ng'
	// ];
	// postData(sample)

	function postData(data) {
		$.ajax({
			type: 'POST',
			url: '/api/run',
			data: {
				urls: data
			}
		}).done(function(res) {
			console.log('res:', res);
		});
	}
});


/* Sample URLs
https://www.google.com
https://che.ng/portfolio
www.reddit.com
http://fortnite.che.ng
*/