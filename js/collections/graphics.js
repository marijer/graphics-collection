APP.Graphics = Backbone.Collection.extend ( {
	model: APP.graphic,
	url: "graphics",

    order_by_default: function() {
        this._order_by = 'title';
        this.sort();
    }

})