APP.SortView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<span class="label">Sort By</span>' +
	      '<select class="sort-by">' + 
	         '{{#each sort}}' +
	         	'<option class="facet option-sort" data-facet="sort" data-facet-name="{{this.facet}}">{{this.title}}</option>' +
	         '{{/each}}' +
	      '</select>'
	),

	events: {
	    'change select': 'selectionChanged',
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

   selectionChanged: function( e ) {
      e.preventDefault();
      var field = $(e.currentTarget);
      var option = $("option:selected", field);

      this.trigger("sorted_Changed", {target: option});
  },

})