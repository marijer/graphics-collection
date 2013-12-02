APP.Facets = Backbone.Model.extend({
  
  defaults:{
    "facet": "",
    "heading": "",
    "sort_order": "",
  },
  
  url: '/public/data/facets.json'
});