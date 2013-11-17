APP.Graphics = Backbone.Collection.extend ( {
	model: APP.Graphic,
	url: "graphics",

	initialize: function() {
		console.log ("collection initialized");
		this.on('change', this.viewRefresh, this);
	},

	 byColor: function(color) {
	    filtered = this.filter(function(box) {
	      return box.get("color") === color;
	      });
	    return new Boxes(filtered);
	  },

	byTitle: function(title) {
    	filtered = this.filter(function(graphic) {
      return graphic.get("title") === title;
      });
	    return new APP.Graphics(filtered);
	  },

	/* this is a test */
    order_by_default: function() {
        // this._order_by = 'title';
        this.sort();
    },

    viewRefresh: function(event) {
    	this.comparator = 'date';
    	this.order_by_default();
    	APP.graphicView3.render();
    }



})