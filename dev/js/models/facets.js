APP.Facets = Backbone.Model.extend({
  url: "../facets",
  
  defaults:{
    "facet": "",
    "heading": "",
    "sort_order": "",
  },
});