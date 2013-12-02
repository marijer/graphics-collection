APP.ScrollView = Backbone.View.extend ({

	initialize: function() {
	    $(window).scroll(this.onScrolling);
	    if (Backbone.isiPad) $(window).on({ 'touchmove' : this.onScrolling });

	    $('.scroll-to-top').click(this.goToTop); // go to top
	},

	goToTop: function() {
      $('html,body').animate({ scrollTop: 0 }, 'slow');
      return false; 
	},

    onScrolling: function () {
    	var $scrollTop = $(window).scrollTop();
    	var viewportHeight = $(window).height();
    	var bodyHeight = $('body').height();

    	if ($scrollTop > 34 && viewportHeight < bodyHeight) {
		    $('.fixed-menu-wrapper').addClass('fixed');

		    if ( $scrollTop > 800){
		    	$('.scroll-to-top').fadeIn(600);
		    } else {
				$('.scroll-to-top').fadeOut(200);
		    }
		} else {
		    $('.fixed-menu-wrapper').removeClass('fixed');
		    $('.scroll-to-top').hide();
		}

		if($scrollTop + $(window).height() == $(document).height()) {
		    APP.graphicCollectionView.onShowMore(); // infinite scrolling
		}
    }
})