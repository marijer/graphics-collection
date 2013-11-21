APP.SortView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
	      '<select>' + 
	         '{{#each sort}}' +
	         '<option class="facet" data-facet="sort" data-facet-name="{{this.facet}}">{{this.title}}</option>' +
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
        var col =  self.collection;

     	this.$el.append(this.template(col));
	},

   selectionChanged: function( e ) {
      e.preventDefault();
      var field = $(e.currentTarget);
      var option = $("option:selected", field);

      this.trigger("sorted_Changed", {target: option});
  },

})