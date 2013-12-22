APP.PanelView = Backbone.View.extend ({
	
	isHidden: true,

	template: Handlebars.compile(
		'<div class="panelViewWrapper">' +
			'Show Menu' +
		'</div>'
	),

	events: {
		"click .panelViewWrapper": "onClick"
	},

	onClick: function( e ) {
		var $panel = $('.panel-wrapper');

		if( !$panel.hasClass("show-menu") ) {
			$panel.addClass('show-menu');
			$('.panelViewWrapper').html('Hide Menu');
		} else {
			$panel.removeClass('show-menu');
			$('.panelViewWrapper').html('Show Menu');
		}

	},

	render: function() {
		this.$el.html(this.template);
		return this;
	},

})