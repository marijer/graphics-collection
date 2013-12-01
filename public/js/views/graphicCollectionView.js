APP.GraphicCollectionView = Backbone.View.extend ({
	template: Handlebars.compile(
		'<div class="show-more">show more</div>'
	),

	page: 0,
	limit: 11,
	totalGraphics: 0,

	events: {
	    'click .show-more': 'onShowMore',
  	},

	initialize: function() {
    	this.on("reset", this.render, this);
	},

	render: function() {
		var self = this;
		self.$el.html("");  // reset html element

		self.totalGraphics = self.collection.length;
		self.updateTotalGraphics();
		
		self.renderProjectGroup(self.page, self.limit);

		if (self.limit <= self.totalGraphics) {
			self.$el.append(self.template);
		}
	},

	addOne: function( model ) {
        var graphicItemView = new APP.GraphicItemView({
            model: model
        });

        this.$el.append(graphicItemView.render().el);
    },

	renderProjectGroup: function(start, end) {
	   var subset = _.filter(this.collection.models, function(num, index){
	      return (index >= start) && (index <= end);
	   });

	   _.each(subset, function(project) {
	   		this.addOne(project);
	   }, this);
	},

    updateTotalGraphics: function(  ) {
    	$('.total-graphics').html( "<span class='bold'>"+ this.totalGraphics + "</span> graphics");
    },

    onShowMore: function() {
    	this.page++;
    	var start = this.page * this.limit;
    	var end = start + this.limit;

    	$( ".show-more" ).remove();

     	var endCheck = this.totalGraphics - end >= this.limit ? end : end + (this.totalGraphics - end);

     	console.log("start: " + start + " end: " + endCheck);
    	if (end < this.totalGraphics) {
    		this.renderProjectGroup(start, endCheck);
    		this.$el.append(this.template);
    	}
    }
})