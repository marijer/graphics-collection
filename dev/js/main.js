var APP =  window.APP = {};  // window is redundant, gives insight

//sets universal (events) controller which can be used anywhere
Backbone.controller = _.extend({}, Backbone.Events);

//checks if user device is ipad
Backbone.isiPad = navigator.userAgent.match(/iPad/i) != null;


/*
$(document).ready(function(e) {

	$('.tooltip').mouseenter(function(e){
		var $this = $(this),
			$el = $('#tooltip-container');

		if ($this.attr('data-tip-type') === "text" ) {
			$el.html($this.attr('data-facet'));
		}

		$el.css({'display':'block', 'opacity': 0}).animate({opacity: 1}, 250);
		e.stopPropagation(); 
	}).mousemove(function( e ){
		var $el = $('#tooltip-container');
		var toolTipWidth = $el.outerWidth(); 
		var toolTipHeight = $el.outerHeight(); 

		// check if the x pos not exceeds the page width
		var pageWidth = $('body').width();
		if ( e.pageX > pageWidth / 2 ) {
			$el.css('left', (e.pageX - toolTipWidth + 20) + 'px' );
		} else {
			$el.css('left', ( e.pageX - 20 ) + 'px');
		}

		// checks if y pos is not higher than the browser
		if (e.pageY > 100) {
			$el.css('top', (e.pageY - toolTipHeight + 20) + 'px' );
		} else {
			$el.css('top', ( e.pageY + 20 ) + 'px');
		}
		e.stopPropagation(); 
	}).mouseleave(function(e){
		$el = $('#tooltip-container');

		$el.animate({opacity: 0}, 250, function() {
			$el.css('display', 'none').html('');
		});	
		e.stopPropagation(); 
	});
});

*/