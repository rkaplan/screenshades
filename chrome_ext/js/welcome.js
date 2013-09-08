$(document).ready(function() {
	// prepare the horizontal sliding up content:
	var scrollContent = $('.boxes');
	var boxSize = $('.boxes .box-1').width();
	scrollContent.width(boxSize * scrollContent.children().length + 100);

	function scroll(amount, absolute) {
		scrollContent.css('left', 
			(absolute ? 0 : parseInt(scrollContent.css('left'))) + 
			(-1 * boxSize * amount) + 'px');
	}

	function filterShows(text) {
		console.log('filtering by ' + text);

		var shows = $('.available-shows .tv-show');
		shows.each(function(index) {
			var el = $(this);
			var title = el.find('.show-title')[0].innerText;
			if(title.indexOf(text) === -1) {
				el.hide();
			}
			else {
				el.show();
			}
		});
	}

	// transition hooks:
	$('.email-signup').click(function(e) {
		scroll(1);
	});
	$('.next-button').click(function(e) {
		scroll(1);
	});
	$('.circular-button-1').click(function(e) {
		scroll(1, true);
	});
	$('.circular-button-2').click(function(e) {
		scroll(2, true);
	});
	$('.circular-button-3').click(function(e) {
		scroll(3, true);
	});


	// search hook:
	var searchBox = $('#search-shows');
	searchBox.keyup(function(e) {
		if(e.keyCode === 13) { // return key
			searchBox.blur();
		}
		else {
			var searchText = searchBox.val();
			filterShows(searchText);
		}
	})

	// search bar dropdown:
	/*
	$('#search-shows').typeahead([
	{
		name: 'Click here to search for TV shows to add',
		local: [
			"Mercury", 
			"Venus", 
			"Earth", 
			"Mars", 
			"Jupiter", 
			"Saturn", 
			"Uranus", 
			"Neptune"
		]
	}
	]);
	*/
})

