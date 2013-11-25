APP.FacetsView = Backbone.View.extend ({

  template: Handlebars.compile(
    '<div class="filter-wrapper">' +
        '<h2>{{heading}}</h2>' +
          '<ul class={{facet}}>' +
            '{{#each options}}' + // by using ../ you go one level up in handlebars
                '<li class="facet" data-facet="{{setToLowerCase ../facet}}" data-facet-name="{{setToLowerCase this.facet}}">{{this.title}}<span class="remove"></span></li>' +
            /*    '{{#if suboptions}}' +
                    '<ul class="suboptions">' +
                    '{{#each suboptions}}' +
                    '<li class="facet" data-facet-name="{{facet}}">{{title}}</li>' +
                    '{{/each}}' +
                    '</ul>' +
                '{{/if}}' + */
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