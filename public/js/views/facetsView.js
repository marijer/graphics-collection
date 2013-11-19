APP.FacetsView = Backbone.View.extend ({

  template: Handlebars.compile(
    '<div class="filter-wrapper">' +
        '<h2>{{heading}}</h2>' +
          '<ul class={{facet}}>' +
            '{{#each options}}' + // by using ../ you go one level up in handlebars
                '<li class="facet" data-facet="{{../facet}}" data-facet-name="{{this}}">{{this}}</li>' +
            '{{/each}}' +
          '</ul>' +
    '</div>'
  ),

  events: {
    'click .facet': 'filterResults'
  },
  
  initialize: function(){
    this.renderFacets(); 
  },

  renderFacets: function() {
  	var self = this;
    var col =  self.collection.attributes;

    _.each(col.facets, function (facet) {
        this.$el.append(this.template(facet));
      }, this);
  },

  filterResults: function( e ) {
    var self = this,
        $this = $(e.target),
        $parent = $this.parent();
        
        // set class active or non-active
         if($this.hasClass('active')){
            $this.removeClass("active");
         } else {
            $this.addClass('active').siblings().removeClass('active');
         }
        
         // go through selected facets
         var _hash = [];

         self.$el.find('.active').each(function(){
          
          var ele = $(this),
              category = ele.attr("data-facet"),
              name = ele.attr("data-facet-name");

          _hash.push(category+"="+escape(name));
        });

         console.log (_hash);


  },

  render: function () {
    // var self = this;
    // var col =  self.collection.attributes;

    // _.each(col.facets, function (facet) {
    //     this.$el.append(this.template(facet));
    //   }, this);
  }

});