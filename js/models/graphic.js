APP.graphic = Backbone.Model.extend ({
	defaults: {
		title: "undefined",
		date: null,
		source: "unknown",
		creators: "unknown",
		favorite: false,
		img: {
			small: "test.png",
			large: "test_large.png"
		},
		news_type: "unknown",
		annotated_type: "unknown"

	}
});


