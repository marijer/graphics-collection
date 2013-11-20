APP.Graphics = Backbone.Collection.extend ( {
	model: APP.Graphic,
	url: "graphics",
	comparator: "date",  //

	initialize: function() {
		console.log ("collection initialized");
		this.on('change', this.viewRefresh, this);
	},

	sortByColumn: function(colName) {
	  this.comparator = colName;
	  this.sort();
	},

	nextPage : function() {
        this.page++;
    }

})