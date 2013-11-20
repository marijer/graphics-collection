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

  template2: Handlebars.compile(
      '<select>' + 
         '{{#each sort}}' +
         '<option class="facet" data-facet="sort" data-facet-name="{{this.facet}}">{{this.title}}</option>' +
         '{{/each}}' +
      '</select>'
   ),

  events: {
    'click .facet': 'filterResults',
    'change select': 'selectionChanged',
  },

  initialize: function(){
   // this.renderSort();
    this.renderFacets();
  },

  renderFacets: function() {
  	var self = this;
   var col =  self.collection.attributes;

    _.each(col.facets, function(facet) {
        this.$el.append(this.template(facet));
      }, this);
  },

  renderSort: function() {
      var self = this;
      var col =  self.collection.attributes;

      this.$el.append(this.template2(col.sort));
  },

  filterResults: function( e, select ) {
      var self = this,
         $this = $(e.target),
         $parent = $this.parent();

      if (select) $this = e;
        
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
      
      if (e.preventDefault) e.preventDefault();
  },

   selectionChanged: function( e ) {
      e.preventDefault();
      var field = $(e.currentTarget);
      var option = $("option:selected", field);

      this.filterResults(option, true);  // tell renderResults its a select menu
  },

  render: function () {

  }

});