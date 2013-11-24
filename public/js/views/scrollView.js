APP.ScrollView = Backbone.View.extend ({

	initialize: function() {
	    $(window).scroll(this.onScrolling);

	    $('.scroll-to-top').click(this.goToTop);
	},

	goToTop: function() {
      $('html,body').animate({ scrollTop: 0 }, 'slow');
      return false; 
	},

    onScrolling: function () {
    	var $scrollTop = $(window).scrollTop();
    	if ($scrollTop > 36 ) {
		    $('.fixed-menu-wrapper').addClass('fixed');

		    if ( $scrollTop > 400){
		    	$('.scroll-to-top').fadeIn(600);
		    } else {
				$('.scroll-to-top').fadeOut(600);
		    }
		} else {
		    $('.fixed-menu-wrapper').removeClass('fixed');
		    $('.scroll-to-top').hide();
		}

		if($scrollTop + $(window).height() == $(document).height()) {
		    APP.graphicCollectionView.onShowMore();
		}
    }
})