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
	},

	byYear: function( minYear, maxYear ) {
    
      filtered = this.filter( function( graphic ) {
      	var date = String(graphic.get( "date" )).substring(0,4);
      	var bool = date >= minYear && date <= maxYear ? true: false;
      	return bool;
     	});

    return new APP.Graphics( filtered );
   },

   byFilters: function (params){
   		var self = this,
   			collection,
   			newCollection = this;

        // filters in the collection class
        var paramYears = false;
        if (params.years) {
            var years = params.years.split("-");
            Backbone.controller.trigger('checkSlider', {param: params.years});
            paramYears = params.years;
            newCollection = this.byYear(years[0], years[1]);
            delete params.years;
         } 

         var paramSort = false;
         // call sort function with right param + remove it from selection
         if (params.sort) {
            newCollection.sortByColumn(params.sort);
            Backbone.controller.trigger('checkSort', {param: params.sort});
            paramSort = params.sort;
            delete params.sort;
         } 

         if(_.size(params) ){ // checks if 1 or more parameters are used

            // cals search view if title is present, updates value if needed (is for refresh)
            if (params.title) {
               Backbone.controller.trigger('checkSearch', {search: params.title});
            }

            _.each(params, function (val, key){  // loop over all parameters
                  var val = self.escapeRegex(val); //clean up value
                  var pattern = new RegExp(val, "i");

                  newCollection = newCollection.filter(function(doc){        
                     pattern.lastIndex= 0; // Reset the last Index          
                     return pattern.test(doc.get(key));        
                  });
            }) //end each

             collection = new Backbone.Collection(newCollection);

         } else {
            collection =  newCollection;  // if no parameters are set - return normal collection
      }   
     
      if (paramSort) params.sort = paramSort;
      if (paramYears) params.years = paramYears;
      return collection;

   },

    escapeRegex: function(value){
      return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
   }


})