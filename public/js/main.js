var APP =  window.APP = {};  // window is redundant, gives insight
Backbone.controller = _.extend({}, Backbone.Events);


Backbone.isiPad = navigator.userAgent.match(/iPad/i) != null;


