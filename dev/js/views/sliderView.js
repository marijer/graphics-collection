APP.SliderView = Backbone.View.extend ({

	minYear: 2000,
	maxYear: 2013,
   filter_minYear: this.minYear,
	filter_maxYear: this.maxYear,

	initialize: function() {
		var self = this;
		var $slider = $("#Slider");

		$slider.slider({ 
			from: self.minYear, 
			to: self.maxYear, 
			step: 1, 
			smooth: false, 
			skin: "round_plastic", 
			format: { format: '####'}, 
			round: 0, 
			dimension: '', 
		   callback: function( value ){ self.slideYear($slider)} 
		});

		//$slider.show();

		Backbone.controller.on('checkSlider', this.checkSlider, this);
	},
			
	slideYear:function ( slider ) {		

		var $slider = $(slider);
		var values = $slider.slider("value")
		var split = values.split(';');

		this.filter_minYear = Number(split[0]);
		this.filter_maxYear = Number(split[1]);

		if (this.filter_minYear  !== this.minYear || this.filter_maxYear !== this.maxYear ) {
			$slider.addClass("active");
		} else {
			$slider.removeClass("active");
		}

		var data = $slider.attr("data-facet-name");
		data = values.replace(";", "-");
		$slider.attr('data-facet-name', data);	

		this.trigger("slider_Changed", {target: $slider});
	},

	checkSlider: function( obj ) {
		var years = obj.param.split("-");
		var $slider = $("#Slider");

		$slider.slider("value", years[0], years[1]);

		var data = $slider.attr("data-facet-name");
		data = years[0] + "-" + years[1];
		$slider.attr('data-facet-name', data);	

	}
})

// slider from http://egorkhmelev.github.com/jslider/