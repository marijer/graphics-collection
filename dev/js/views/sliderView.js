APP.SliderView = Backbone.View.extend ({

	minYear: 2000,
	maxYear: 2015,

	template: Handlebars.compile(
		'<input id="Slider" type="slider" class="facet" data-facet="years" name="area" value="2000;2015" data-facet-name="2000-2015" style="display:none;" />'
	),


	initialize: function() {
		var self = this;

		this.$el.html(this.template);
		
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

		var $slider = $(slider),
			values = $slider.slider("value"),
			split = values.split(';'),
			data = $slider.attr("data-facet-name");

		data = values.replace(";", "-");
		$slider.attr('data-facet-name', data);	

		this.trigger("slider_Changed", {target: $slider});
	},

	checkSlider: function( obj ) {
		var years = obj.param.split("-");
		this.updateSlider(years[0], years[1]);
	},

	updateSlider: function(year, year2) {
		var $slider = $("#Slider");
		$slider.slider("value", year, year2);

		var data = $slider.attr("data-facet-name");
		data = year + "-" + year2;
		$slider.attr('data-facet-name', data);	
	},

	reset: function() {
		this.updateSlider(this.minYear, this.maxYear);
	}
})

// slider from http://egorkhmelev.github.com/jslider/