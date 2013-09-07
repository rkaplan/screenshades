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
})

