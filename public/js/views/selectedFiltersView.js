APP.SelectedFiltersView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<div class="filter-label" data-facet="{{category}}" data-facet-name="{{facet}}">' +
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
	},

// removes the filter from sidebar
	onClickFilterLabel: function( ev ) {
		var target = $(ev.target).parent();
		Backbone.controller.trigger('removedSelectedFilter', {target: target});
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
	},

	removeAll:function(el){
		this._hash = [];
		$('.filter-label').remove();
	},

	updateLabel: function( obj ) {
		//console.log(obj.el)
		var $el = $(obj.el);
		//console.log(typeof(obj.arr)) ;

		var category = $el.attr("data-facet"),
		name = $el.text(),
		facet = $el.attr("data-facet-name");

		var existingCategory = _.filter(this._hash, function( e ){ return e.category === category; });

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
});