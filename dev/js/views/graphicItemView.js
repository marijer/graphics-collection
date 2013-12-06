APP.GraphicItemView = Backbone.View.extend({
 
    tagName:"article",
    className: "graphic",

    template: Handlebars.compile(
        '<div class="inner-graphics-wrapper">' +
            '<div class="image-wrapper">'+
                '<a href="{{ url }}" target="_blank" title="{{ title }}" >' +
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

        var $img = self.$el.find('img.graphics-image');
        var $a = self.$el.find('a');

        if ($img[0].complete){  // checks i
            $img.css("opacity", 0.3).animate({
              opacity: 1
            },400);

        } else {
            $img.hide().on('load', function(e) { //load images
                self.img_loaded(e);
            });
        } 

        return self;
    },

    img_loaded: function( e ){
         $(e.target).fadeIn(400);
    }
});