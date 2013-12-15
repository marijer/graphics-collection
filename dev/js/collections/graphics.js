APP.Graphics = Backbone.Collection.extend ( {
	model: APP.Graphic,
	url: "../graphics",
	sortKey: "desc",

	comparator: function(a, b) {
	  // Optional call if you want case insensitive
	  name1 = a.get(this.sortKey).toLowerCase();
	  name2 = b.get(this.sortKey).toLowerCase();

	  if (name1 < name2) {
	    ret = -1;
	  } else if (name1 > name2) {
	    ret = 1;
	  } else {
	    ret = 0;
	  }

	  if (this.sort_dir === "desc")
	    ret = -ret
	  return ret;
	},

	initialize: function() {
		this.on('change', this.viewRefresh, this);
		this.sortByColumn(this.sortKey);
	},

	sortByColumn: function(colName) { 
			this.sortkey = colName;

			if (colName === "asc") {
				this.sort_dir = "asc";
				this.sortKey = "date";
			} else if ( colName === "desc") {
				this.sort_dir = "desc";
				this.sortKey = "date";
			} else {  // if not asc or desc, it is set to recently added
				this.sort_dir = "desc";
				this.sortKey = "id";
			}


			this.sort();	
	}
})