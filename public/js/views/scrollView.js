APP.ScrollView = Backbone.View.extend ({

	initialize: function() {
	    $(window).scroll(this.onScrolling);

	    $('.scroll-to-top').click(this.goToTop);
	},

	goToTop: function() {
		console.log("clicked");
      $('html,body').animate({ scrollTop: 0 }, 'slow');
      return false; 
	},

    onScrolling: function () {
    	
    	if ($(window).scrollTop() > 33) {
		    $('.fixed-menu-wrapper').addClass('fixed');
		    $('.scroll-to-top').show();
		} else {
		    $('.fixed-menu-wrapper').removeClass('fixed');
		    $('.scroll-to-top').hide();
		}

		if($(window).scrollTop() + $(window).height() == $(document).height()) {
		    APP.graphicCollectionView.onShowMore();
		}
		
    }
})