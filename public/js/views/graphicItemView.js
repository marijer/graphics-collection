APP.GraphicItemView = Backbone.View.extend({
 
    tagName:"article",
    className: "graphic",

    template: Handlebars.compile(
        '<a href="{{ url }}" title="{{ title }}" >' +
    		'<div class="image-wrapper">' +
                '<img class="graphics-image" src={{getImgPath this}}>' +
                '<div class="date">{{formatDate date}}</div>'  + //makes use of registerHelper in handlehelpers.js
            '</div>' +
        '</a>' + 
		'<h2>{{title}}</h2>'
	),
 
    render:function (eventName) {
    	var attributes = this.model.attributes;
        this.$el.html(this.template( attributes ));
        return this;
    }
 
});