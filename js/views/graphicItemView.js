APP.GraphicItemView = Backbone.View.extend({
 
    tagName:"article",
    className: "graphic",

    template: Handlebars.compile(
		'<img class="graphics-image" src={{img.small}}>' +
		'<h2>{{title}}</h2>' +
		'<div class="date">{{date}}</div>'	
	),
 
    render:function (eventName) {
    	var attributes = this.model.attributes;
        this.$el.html(this.template( attributes ));
        return this;
    }
 
});