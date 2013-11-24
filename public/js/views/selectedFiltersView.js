APP.SelectedFiltersView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<div class="filter-label" data-facet="{{category}}" data-facet-name="{{facet}}">' +
			'<div class="name">{{name}}</div>'+
		'</div>'
	),

	events: {
		'click .filter-label': "onClickFilterLabel",
	},

	initialize: function() {
		// create array which stores all selected items
		this._hash = [];
	},

// removes the filter from sidebar
	onClickFilterLabel: function( ev ) {
		var target = $(ev.target).parent();
		Backbone.controller.trigger('removedSelectedFilter', {target: target});
	},

	updateLabel: function( el ) {
		var $el = $(el);

		var category = $el.attr("data-facet");
			 name = $el.text();
          facet = $el.attr("data-facet-name");

      var tobeRemoved = _.filter(this._hash, function(e){ return e.category == category && e.name === name });

      if (tobeRemoved.length === 1) {
      	$('.filter-label[data-facet="'+ category +'"]').remove();

      	this._hash = _.without(this._hash, _.findWhere(this._hash, {category: category}));
      } else {

 			var existingCategory = _.filter(this._hash, function(e){ return e.category === category; });

	      if (existingCategory.length === 1) {
	      	var obj = existingCategory[0],
	      		 cat = obj.category;
	      		 catName = obj.name;

	      	$('.filter-label[data-facet="'+cat+'"]').find('.name').html(name);
	      	this._hash = _.without(this._hash, _.findWhere(this._hash, {category: category}));
	      } else {
				this.$el.append(this.template({category:category, name: name, facet: facet}));
	      }
	      this._hash.push({category: category, name: name, facet:facet});
      }
     
      console.log(this._hash);

	}
});