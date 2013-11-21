APP.FacetsView = Backbone.View.extend ({

  template: Handlebars.compile(
    '<div class="filter-wrapper">' +
        '<h2>{{heading}}</h2>' +
          '<ul class={{facet}}>' +
            '{{#each options}}' + // by using ../ you go one level up in handlebars
                '<li class="facet" data-facet="{{../facet}}" data-facet-name="{{this.facet}}">{{this.title}}</li>' +
            '{{/each}}' +
          '</ul>' +
    '</div>'
  ),

  events: {
    'click .facet': 'filterResults',
  },

  initialize: function(){
    this.render();
  },

//triggers function in master view
  filterResults: function(e) {
    this.trigger("filter_Changed", {target: e.target}); 
  },

  render: function () {
    var self = this;
    var col =  self.collection;

    _.each(col, function(facet) {
        this.$el.append(this.template(facet));
      }, this);
  }

});