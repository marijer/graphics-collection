APP.Graphics = Backbone.Collection.extend ( {
	model: APP.Graphic,
	url: "graphics",
	sortKey: "desc",

	comparator: function(a, b) {
	  // Optional call if you want case insensitive
	  name1 = a.get('date').toLowerCase();
	  name2 = b.get('date').toLowerCase();

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
		//if( this.sortKey !== colName ) {
			this.sortkey = colName;

			if (colName === "asc") {
				this.sort_dir = "asc";
			} else {
				this.sort_dir = "desc";
			}
			this.sort();	
		//}
	}
})