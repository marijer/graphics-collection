APP.GraphicItemView = Backbone.View.extend({
 
    tagName:"article",
    className: "graphic",

    template: Handlebars.compile(
		'<div class="image-wrapper">' +
            '<img class="graphics-image" src=/public/{{img.small}}>' +
            '<div class="date">{{formatDate date}}</div>'  + //makes use of registerHelper in handlehelpers.js
        '</div>' +
		'<h2>{{title}}</h2>'
	),
 
    render:function (eventName) {
    	var attributes = this.model.attributes;
        this.$el.html(this.template( attributes ));
        return this;
    }
 
});