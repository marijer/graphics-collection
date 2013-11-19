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
        
      // go through all selected facets and save them in array
      var _hash = [];

      self.$el.find('.active').each(function(){
          
      var el = $(this),
         category = el.attr("data-facet"),
         name = el.attr("data-facet-name");
         _hash.push(category+"="+escape(name));
      });

      if(_hash.length){
          window.location.hash="!/search?"+_hash.join('&');
      }else{
         window.location.hash="!/";
      }
       
      e.preventDefault();
  },

  render: function () {

  }

});