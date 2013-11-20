APP.GraphicItemView = Backbone.View.extend({
 
    tagName:"article",
    className: "graphic",

    template: Handlebars.compile(
        '<div class="inner-graphics-wrapper">' +
            '<div class="image-wrapper">'+
                '<a href="{{ url }}" title="{{ title }}" >' +
                    '<img class="graphics-image" src={{getImgPath this}}>' +
                    '<div class="date">{{formatDate date}}</div>'  + //makes use of registerHelper in handlehelpers.js
                '</a>' + 
            '</div>' +
    		'<h2 class="{{setFavicon newspaper}}"><span>{{title}}</span></h2>' +
        '</div>'
	),
 
    render: function( e ){
        var self = this;
    	var attributes = self.model.attributes;

//TODO hide only images that have not been loaded yet
        self.$el.html(self.template( attributes ));  
        self.$el.find('img.graphics-image').hide().on('load', function(e) { //load images
            self.img_loaded(e) 
        });
        return self;
    },

    img_loaded: function( e ){
         $(e.target).fadeIn(400);
    }
 
});