var APP =  window.APP = {};  // window is redundant, gives insight

//sets universal (events) controller which can be used anywhere
Backbone.controller = _.extend({}, Backbone.Events);

//checks if user device is ipad
Backbone.isiPad = navigator.userAgent.match(/iPad/i) != null;