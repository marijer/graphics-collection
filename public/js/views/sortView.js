APP.SortView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<span class="label">Sort By</span>' +
	      '<select class="sort-by">' + 
	         '{{#each sort}}' +
	         '<option class="facet option-sort" {{setSelected ../this this.facet}} data-facet="sort" data-facet-name="{{this.facet}}">{{this.title}}</option>' +
	         '{{/each}}' +
	      '</select>'
	),

	events: {
	    'change select': 'selectionChanged',
	},	

	initialize: function () {
		this.render();
	},

	render: function () {
        var self = this;
        var col = self.collection;
		
	//	var app = Backbone.history.getQueryParameters();

    //    if (app.sort){ col.selection = app.sort; } //sets selection if it is there
		
     	this.$el.append(this.template(col));
	},

   selectionChanged: function( e ) {
      e.preventDefault();
      console.log("hi")
      var field = $(e.currentTarget);
      var option = $("option:selected", field);

     this.trigger("sorted_Changed", {target: option});
  },

})