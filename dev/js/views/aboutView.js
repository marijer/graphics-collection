APP.AboutView = Backbone.View.extend ({

	open: false,
	
	template: Handlebars.compile(
		"<span class='about pointer'>about</span>"
	),

	template2: Handlebars.compile(
		"<div class='close right pointer'>close</div>" +
		"<h2 class='clear'>About</h2>" +
		"<p class='about'>" +
		"This page shows interactive graphic work of the Guardian and the New York Times." +
			" The page does not contain all of the work of both news organizations. It is a goal, but it does not seem to be a viable one." +
		"</p>" +
		"<p class='about'>" +
			"I am updating the page every time I come across work of the two news organizations." +
			"If you know about a graphice which is not shown here or maybe it is in the database and completely wrong categorized, please let me know." +
			"You can drop me a line on twitter @marijerr or send me a mail at marijer@gmail.com." +
		"</p>" 
	),

	events: {
		"click .about": "onClick"
	},

	onClick: function( e ) {
		if ( APP.aboutView.open ){
			this.onCloseClick();
		} else {
			var $el = $( '.annotation-wrapper' );
			$el.hide().html( this.template2 ).slideDown('fast');

			$('.close').click( this.onCloseClick );
			APP.aboutView.open = true;
		}
		//console.log(this.open);
	},

	onCloseClick: function( e ){
		var $el = $( '.annotation-wrapper' );
		$el.slideUp();

		APP.aboutView.open = false;
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html( this.template );
		return this;
	},

})