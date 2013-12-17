APP.SortView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
	      
	    '<div class="sort-label"> sort' +
		'<div class="sort-options-wrapper">' + 
	      '<ul class="sort-by">' + 
	         '{{#each sort}}' +
	         	'<li class="facet option-sort" data-facet="sort" data-facet-name="{{this.facet}}">{{this.title}}</li>' +
	         '{{/each}}' +
	        '</ul>' +
	     '</div>' + 
	     '</div>'
	),

	events: {
		'click .sort-label': 'clickSortLabel',
	    'click .option-sort': 'selectionChanged',
	},	

	initialize: function () {
		this.render();
		Backbone.controller.on('checkSort', this.updateSort, this);
	},

	render: function () {
        var self = this;
        var col = self.collection;
     	this.$el.append(this.template(col));
	},

	updateSort: function(obj) {
		var $el = $('.facet[data-facet-name="'+obj.param+'"]');
		//set selection
		$el.prop('selected', true);
		$el.addClass('active');
	},

	clickSortLabel: function(e) {
		e.preventDefault();
		var $el = $(e.target);

		if ( $el.hasClass("selected") ) {
 			$el.removeClass("selected"); 
		} else {
			 $el.addClass("selected");
		}
	},

   selectionChanged: function( e ) {
      e.preventDefault();
      var $el = $(e.target);

    	this.trigger("sorted_Changed", {target: $el});
    	$('.sort-label').removeClass("selected"); 
  },

})