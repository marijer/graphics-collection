APP.Graphics = Backbone.Collection.extend ( {
	model: APP.Graphic,
	url: "graphics",
	comparator: "date",  //

	initialize: function() {
		this.on('change', this.viewRefresh, this);
	},

	sortByColumn: function(colName) { // this needs to be fixed properly
	  this.comparator = colName;
	  this.sort();
	}
})