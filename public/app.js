$(document).ready(function() {
	$('#submit').on('click', function(event) {
		event.preventDefault();

		var urls = $('#urls').val().trim();
		var urlArray = urls.split(/[\n\r]/g);
		// console.log('urlArray:', urlArray);
		
		// add loading icon
		$('#submit').addClass('is-loading');
		// clear out existing link
		$('#download-section').empty();


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
			var downloadID = res.downloadID;
			
			// build download link
			var $link = $('<a>',{
				href: '/api/download/'+downloadID,
				class: 'dl-btn button is-large is-success',
				id: 'download-trigger'
			})

			var $linkIconContainer = $('<span>').addClass('icon');
			var $linkIcon = $('<i>').addClass('fas fa-download');
			$linkIconContainer.append($linkIcon)
			$link.append($linkIconContainer);
			
			var $linkText = $('<span>').text('Download Screenshots');
			$link.append($linkText);

			$('#download-section').append($link)

			// remove loading icon from submit button
			$('#submit').removeClass('is-loading');
		});
	}


});


/* Sample URLs
https://www.google.com
https://che.ng/portfolio
www.reddit.com
http://fortnite.che.ng
*/