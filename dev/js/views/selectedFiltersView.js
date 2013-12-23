APP.SelectedFiltersView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<div class="filter-label tooltip" data-tip-type="text" data-facet="{{category}}" data-facet-name="{{facet}}">' +
		'<div class="name">{{name}}</div>'+
		'<span class="remove"></span> </div>'
		),

	events: {
		'click .filter-label': "onClickFilterLabel",
	},

	initialize: function() {
		// create array which stores all selected items
		this._hash = [];

		Backbone.controller.on('selectedFilter', this.selectedFilter, this);
		Backbone.controller.on('removeFilters', this.removeAll, this);

		this.$el.append("<span class='filter-info'>active filter(s):</span>");
	},

// removes the filter from sidebar
	onClickFilterLabel: function( e ) {
		e.preventDefault();
		var target = $(e.target).parent();
		Backbone.controller.trigger('removedSelectedFilter', {target: target});
		this.removeFacet(target.attr("data-facet"));
	},

	selectedFilter: function( obj ){
		var self = this;
		this.updateLabel(obj);

		// to be removed
		var tobeRemovedCategory = _.filter(this._hash, function(e){ 
			for (var key in obj.arr) {
			   var $el = $(obj.arr[key]);
			   var category = $el.attr("data-facet");
			   facet = $el.attr("data-facet-name");

			   if ( e.category === category ){
			   	return true;
			   }
			}
			// if nothing returned true, than remove the facet
			self.removeFacet(e.category);
		});
	},

	removeFacet:function(category){
		var $el = $('.filter-label[data-facet="'+category+'"]')[0];
		$el.remove();

		//remove from the hash map
		this._hash = _.without(this._hash, _.findWhere(this._hash, {category: category}));

		if (this._hash.length === 0) $('.filter-info').removeClass('hasFilter');
	},

	removeAll:function(el){
		this._hash = [];
		$('.filter-label').remove();
		$('.filter-info').removeClass('hasFilter');
	},

	updateLabel: function( obj ) {
		var $el = $(obj.el);


		var category = $el.attr("data-facet"),
		name = $el.text() || $el.attr("data-facet-name"),
		facet = $el.attr("data-facet-name");

		// if category is sort, don't do anything
		if (category === "sort") return; 	

		var existingCategory = _.filter(this._hash, function( e ){ return e.category === category; });

		if (existingCategory.length === 1) {

			var $label = $('.filter-label[data-facet="'+category+'"]');

			//update value and data attribute
			$label.find('.name').html(name);
			data = facet;
			$label.attr('data-facet-name', data);	

			this._hash = _.without(this._hash, _.findWhere(this._hash, {category: category}));
		} else {
 			if (this._hash.length === 0) $('.filter-info').addClass('hasFilter');

			this.$el.append(this.template({category:category, name: name, facet: facet}));
		}
		this._hash.push({category: category, name: name, facet:facet});

	}
});