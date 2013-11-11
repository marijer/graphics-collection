APP.users = Backbone.Collection.extend ( {
	model: APP.user,
	url: "/users"
})