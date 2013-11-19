APP.Graphic = Backbone.Model.extend ({
	defaults: {
		id: "",
		title: "undefined",
		date: null,
		source: "unknown",
		creators: "unknown",
		favorite: false,
		img: {
			small: "img/graphics/test.jpg",
			large: "test_large.png"
		},
		news_type: "unknown",
		annotated_type: "unknown"
	}
});


