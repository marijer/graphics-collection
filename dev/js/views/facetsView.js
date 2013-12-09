APP.FacetsView = Backbone.View.extend ({

  template: Handlebars.compile(
    '<div class="filter-wrapper">' +
        '<h2 class="{{isExpanded expanded}} header">{{heading}}</h2>' +
          '<ul class="{{facet}} {{isExpanded expanded}}">' +
            '{{#each options}}' + // by using ../ you go one level up in handlebars
                '<li class="facet" data-facet="{{setRightFacet .. this}}" data-facet-name="{{this.value}}">{{this.title}}<span class="remove"></span></li>' +
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
    'click h2': 'onClickHeader',
  },

  initialize: function(){
    this.render();     
  },

//triggers function in master view
  filterResults: function(e) {
    this.trigger("filter_Changed", {target: e.target}); 
  },

// function that does slide up or down
  onClickHeader: function (e){
    var $header = $(e.target);

    if ($header.hasClass('header')){
      if ($header.hasClass('expanded')){
          $header.removeClass('expanded');
          $header.siblings( "ul" ).slideUp("fast");
      } else{
          $header.addClass('expanded');
          $header.siblings( "ul" ).slideDown("fast");
      }
    }
  },

  render: function () {
    var self = this;
    var col =  self.collection;

    _.each(col, function(facet) {
        this.$el.append(this.template(facet));
      }, this);

  }
});