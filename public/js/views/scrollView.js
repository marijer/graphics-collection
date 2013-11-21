APP.ScrollView = Backbone.View.extend ({

	initialize: function() {
	    $(window).scroll(this.onScrolling);
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