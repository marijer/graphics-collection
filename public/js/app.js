
// converts date=20120802 to August, 2013
var m_names = new Array("January", "February", "March", "April", "May", 
	"June", "July", "August", "September", "October", "November", "December");

Handlebars.registerHelper("formatDate", function( date ) {
 	date = String( date );
 	var year = date.substring( 0, 4 );

 	var month = date.substring(4, 6);
 	month = month.replace(/^0+/, '');  // regex removes leading zero's
 	var f_month = m_names[month - 1];	// set month zero based

  	return f_month + ", " + year;
});


/* Image path options
	http://marijerooze.nl/thesis/graphics/images/guardian/guardian_australiaElections2013.jpg
	http://marijerooze.nl/thesis/graphics/images/nytimes/nytimes_economytwistandturns.jpg
*/

Handlebars.registerHelper("getImgPath", function( data ) {
	var img = data.thumbnail,
		newspaper = data.newspaper === "Guardian" ? "guardian" : "nytimes";

	var imgPath	= "http://marijerooze.nl/thesis/graphics/images/" + newspaper + "/"+ img;
  	return imgPath;
});

// sets correct class on title which has the favicon in css 
Handlebars.registerHelper("setFavicon", function( data ) {
	var faviconClass = data === "Guardian" ? 'gua' : 'nyt'
	faviconClass+= " favicon";
	return faviconClass;
})

Handlebars.registerHelper("setRightFacet", function(param1, param2) {
	var sel;

	if (param1.independent) { // if param1 is independent, every individual item contains a facet
		sel = param2.facet; 
	} else {
		sel = param1.facet;
	}

	return sel.toLowerCase();
})


Handlebars.registerHelper("setSelected", function(param1, param2) {
	sel = param1.selection === param2 ? "selected" : "";

	return sel;
})


// set filters by default collapsed or expanded
Handlebars.registerHelper("isExpanded", function(param) {
	var expanded = param ? "expanded" : "collapsed";

	return expanded;
})





var APP =  window.APP = {};  // window is redundant, gives insight

//sets universal (events) controller which can be used anywhere
Backbone.controller = _.extend({}, Backbone.Events);

//checks if user device is ipad
Backbone.isiPad = navigator.userAgent.match(/iPad/i) != null;


APP.Facets = Backbone.Model.extend({
  
  defaults:{
    "facet": "",
    "heading": "",
    "sort_order": "",
  },
  
  url: '/public/data/facets.json'
});
APP.Graphic = Backbone.Model.extend ({
	defaults: {
		id: "",
		title: "undefined",
		date: "unknown",
		source: "unknown",
		creators: "unknown",
		favorite: false,
		thumbnail:"public/img/graphics/test.jpg",
		news_type: "unknown",
		annotation: "unknown",
		flash: "unknown"
	},

	// rewrite of database values
	parse: function(response){
		paper = response.newspaper;
		newscategory = response.newscategory;
		
		if (paper == "guardian") response.newspaper = "gua";
		if (paper == "Ny Times") response.newspaper ="nyt"; 
		if (newscategory == "Economy") response.newscategory = "business"; 

		return response;
 	}
});



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
   			collection = this,
   			newCollection = this;

        // filters in the collection class
        if (params.years) {
            var years = params.years.split("-");
            Backbone.controller.trigger('checkSlider', {param: params.years});

            newCollection = this.byYear(years[0], years[1]);
            delete params.years;
         } 

         var paramSort = false;
         // call sort function with right param + remove it from selection
         if (params.sort) {
            this.sortByColumn(params.sort);
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

                  newCollection = self.filter(function(doc){        
                     pattern.lastIndex= 0; // Reset the last Index          
                     return pattern.test(doc.get(key));        
                  });
            }) //end each

            collection = new Backbone.Collection(newCollection);

         } else {
            collection =  newCollection;  // if no parameters are set - return normal collection
      }   
     
      if (paramSort) params.sort = paramSort;// collection = this;
      return collection;

   },

    escapeRegex: function(value){
      return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
   }


})
APP.FacetsMasterView = Backbone.View.extend({

	initialize: function() {
		this.initSearch();
		this.initSort();
		this.initFacet();
      this.initSelectedFilters();
      this.initSliderView();

      Backbone.controller.on('removedSelectedFilter', this.removedSelectedFilter, this);
   },

   initSearch: function() {
     var self = this;
     var search = new APP.SearchView({ el: $(".search-wrapper") });

     search.on("search_Changed", function(el) {  
      _.debounce(self.filterResults(el.target), 800);	
      });
  },

  initSort: function () {
     var self = this;

     var sortData = self.collection.attributes.sort;
     var sort = new APP.SortView({collection: sortData});
     $('.sort-wrapper').append(sort.$el);

     sort.on("sorted_Changed", function(el) {  
      self.filterResults(el.target);
   });
  },

  initFacet: function() {
   var self = this;

   APP.facetsView = new APP.FacetsView({
       collection: self.collection.attributes.facets
   });

   $('.filters-wrapper').append(APP.facetsView.$el);

   APP.facetsView.on("filter_Changed", function(el) {  
      self.filterResults(el.target);
    });
  },

   initSelectedFilters: function() {
      this.selectedFilters = new APP.SelectedFiltersView({ el: $(".selected-filters-wrapper") });
   },

   initSliderView: function(){
      var self = this;
      APP.sliderView = new APP.SliderView();

      APP.sliderView.on("slider_Changed", function(el) {  
         self.filterResults(el.target);
        // console.log("hi");
      });
   },

   removedSelectedFilter: function(el) {
      var $el = el.target;
      name = $el.attr("data-facet-name");
      facet = $el.attr("data-facet");

      var target = $('.facet[data-facet="'+facet+'"][data-facet-name="'+name+'"]')[0];
      this.filterResults(target);
   },

   filterResults: function( e ) {
      var self = this,
      $this = $(e),
      $parent = $this.parent(),
      search = false;

    
      // handle list items + input
      if( $this.is( "input[type=slider]" )){

      } else if( $this.is( "input" )) {   // handle list items + input
         search = true;
         var query = $this.val();

         if( query === "" && $this.hasClass("active") ) {
              $this.removeClass("active");
         } else {
              $this.addClass("active");
         }

       } else if($this.is("option")) {
          $this.addClass('active').siblings().removeClass('active');
      } else {
   		      // set class active or non-active
   		      if( $this.hasClass('active')){
                 $this.removeClass("active");
              }else {
                 $this.addClass('active').siblings().removeClass('active');
              }
           }

      if (e.preventDefault) e.preventDefault();
         // go through all selected facets and save them in array
      var _hash = [];

      $('body').find('.active').each(function(){

            var el = $(this),
            category = el.attr("data-facet"),
            name = el.attr("data-facet-name");
            _hash.push(category+"="+escape(name));
         });

         if(_hash.length){
          window.location.hash="!/search?"+_hash.join('&');
       }else{
         window.location.hash="!/";
      }

   }
});
APP.FacetsView = Backbone.View.extend ({

  template: Handlebars.compile(
    '<div class="filter-wrapper">' +
        '<h2 class="{{isExpanded expanded}} header">{{heading}}</h2>' +
          '<ul class="{{facet}} {{isExpanded expanded}}">' +
            '{{#each options}}' + // by using ../ you go one level up in handlebars
                '<li class="facet" data-facet="{{setRightFacet .. this}}" data-facet-name="{{this.value}}">{{this.title}}<span class="remove"></span></li>' +
            /*    '{{#if suboptions}}' +
                    '<ul class="suboptions">' +
                    '{{#each suboptions}}' +
                    '<li class="facet" data-facet-name="{{facet}}">{{title}}</li>' +
                    '{{/each}}' +
                    '</ul>' +
                '{{/if}}' + */
            '{{/each}}' +
          '</ul>' +
    '</div>'
  ),

  events: {
    'click .facet': 'filterResults',
    'click h2': 'onClickHeader',
  },

  initialize: function(){
    this.render();     
  },

//triggers function in master view
  filterResults: function(e) {
    this.trigger("filter_Changed", {target: e.target}); 
  },

// function that does slide up or down
  onClickHeader: function (e){
    var $header = $(e.target);

    if ($header.hasClass('header')){
      if ($header.hasClass('expanded')){
          $header.removeClass('expanded');
          $header.siblings( "ul" ).slideUp("fast");
      } else{
          $header.addClass('expanded');
          $header.siblings( "ul" ).slideDown("fast");
      }
    }
  },

  render: function () {
    var self = this;
    var col =  self.collection;

    _.each(col, function(facet) {
        this.$el.append(this.template(facet));
      }, this);

  }
});
APP.GraphicCollectionView = Backbone.View.extend ({
	template: Handlebars.compile(
		'<div class="show-more">show more</div>'
	),

	page: 0,
	limit: 12,
	totalGraphics: 0,

	events: {
	    'click .show-more': 'onShowMore',
  	},

	initialize: function() {
    	this.on("reset", this.render, this);
	},

	render: function() {
		var self = this;
		self.$el.html("");  // reset html element

		self.totalGraphics = self.collection.length;
		self.updateTotalGraphics();
		this.page = 0;
		
		self.renderProjectGroup(self.page, self.limit - 1);

		if (self.limit <= self.totalGraphics) {
			self.$el.append(self.template);
		}
	},

	addOne: function( model ) {
        var graphicItemView = new APP.GraphicItemView({
            model: model
        });

        this.$el.append(graphicItemView.render().el);
    },

	renderProjectGroup: function(start, end) {
	   if (end > this.totalGraphics) end = this.totalGraphics -1;

	   var subset = _.filter(this.collection.models, function(num, index){
	      return (index >= start) && (index <= end);
	   });

	   _.each(subset, function(project) {
	   		this.addOne(project);
	   }, this);
	},

    updateTotalGraphics: function(  ) {
    	$('.total-graphics').html( "<span class='bold'>"+ this.totalGraphics + "</span> graphics");
    },

    onShowMore: function() {
    	this.page++;
    	var start = this.page * this.limit;
    	var end = start + this.limit -1;

    	$( ".show-more" ).remove();

    	if (start < this.totalGraphics - 1) {
    		this.renderProjectGroup(start, end);
    		this.$el.append(this.template);
    	}
    }
})
APP.GraphicItemView = Backbone.View.extend({
 
    tagName:"article",
    className: "graphic",

    template: Handlebars.compile(
        '<div class="inner-graphics-wrapper">' +
                '<a href="{{ url }}" class="image-wrapper" target="_blank" title="{{ title }}" >' +
                    '<img class="graphics-image" src={{getImgPath this}}>' +
                    '<div class="date">{{formatDate date}}</div>'  + //makes use of registerHelper in handlehelpers.js
                '</a>' + 
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
APP.ScrollView = Backbone.View.extend ({

	initialize: function() {
	    if (Backbone.isiPad) { 
	    	$(window).on({ 'touchmove' : this.onScrolling });
	    }else{
	    	  $(window).scroll(this.onScrolling);
	    }

	    $('.scroll-to-top').click(this.goToTop); // go to top
	},

	goToTop: function() {
      $('html,body').animate({ scrollTop: 0 }, 'slow');
      return false; 
	},

    onScrolling: function () {
    	var $scrollTop = $(window).scrollTop();
    	var viewportHeight = $(window).height();
    	var bodyHeight = $('body').height();

    	if ($scrollTop > 33 && viewportHeight < bodyHeight) {
		    $('.fixed-menu-wrapper').addClass('fixed');

		    if ( $scrollTop > 800){
		    	$('.scroll-to-top').fadeIn(600);
		    } else {
				$('.scroll-to-top').fadeOut(200);
		    }
		} else {
		    $('.fixed-menu-wrapper').removeClass('fixed');
		    $('.scroll-to-top').hide();
		}

		if($scrollTop + $(window).height() === $(document).height()) {
		    APP.graphicCollectionView.onShowMore(); // infinite scrolling
		}
    }
})
APP.SearchView = Backbone.View.extend ({
	template: Handlebars.compile(
		'<div class="search">' +
			'<input class="search-input" data-facet="title" data-facet-name="" type="search" placeholder="search on title" >' +
		'</div>'
	),

	events: {
		"keyup .search": "onSearch"
	},

	initialize: function () {
		Backbone.controller.on('checkSearch', this.checkSearch, this);
		this.render();
	},

	// set value of search correct if needed
	checkSearch: function( param ) {
		var $search = $('.search-input');
		var query = $search.val();

		if ( query != param.search ) {
			this.updateSearch( param.search );
		}
	},

	render: function() {
		this.$el.html(this.template);
		return this;
	},

	updateSearch: function( query ) {
		var $search = $('.search-input');
		var data = $search.attr("data-facet-name");
		
		data = query;
		$search.attr('data-facet-name', data);	
		$search.addClass('active');
		$search.val(query);	
	},

	onSearch: function () {
		var $search = $('.search-input');
		var query = $search.val();		

		if( query !== "" ) {
			this.updateSearch( query );
		}

		this.trigger("search_Changed", {target: $search});
	}

})
APP.SelectedFiltersView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<div class="filter-label" data-facet="{{category}}" data-facet-name="{{facet}}">' +
		'<div class="name">{{name}}</div>'+
		'<span class="remove"></span> </div>'
		),

	events: {
		'click .filter-label': "onClickFilterLabel",
	},

	initialize: function() {
		// create array which stores all selected items
		this._hash = [];

		Backbone.controller.on('selectedFilter', this.selectedFilter, this);
		Backbone.controller.on('removeFilters', this.removeAll, this);

		this.$el.append("<span class='filter-info'>active filter(s):</span>");
	},

// removes the filter from sidebar
	onClickFilterLabel: function( e ) {
		e.preventDefault();
		var target = $(e.target).parent();
		Backbone.controller.trigger('removedSelectedFilter', {target: target});
		this.removeFacet(target.attr("data-facet"));
	},

	selectedFilter: function( obj ){
		var self = this;
		this.updateLabel(obj);

		// to be removed
		var tobeRemovedCategory = _.filter(this._hash, function(e){ 
			for (var key in obj.arr) {
			   var $el = $(obj.arr[key]);
			   var category = $el.attr("data-facet");
			   facet = $el.attr("data-facet-name");

			   if ( e.category === category ){
			   	return true;
			   }
			}
			// if nothing returned true, than remove the facet
			self.removeFacet(e.category);
		});
	},

	removeFacet:function(category){
		var $el = $('.filter-label[data-facet="'+category+'"]')[0];
		$el.remove();
	
		//remove from the hash map
		this._hash = _.without(this._hash, _.findWhere(this._hash, {category: category}));
		if (this._hash.length === 0) $('.filter-info').removeClass('hasFilter');
	},

	removeAll:function(el){
		this._hash = [];
		$('.filter-label').remove();
		$('.filter-info').removeClass('hasFilter');
	},

	updateLabel: function( obj ) {
		var $el = $(obj.el);

		var category = $el.attr("data-facet"),
		name = $el.text(),
		facet = $el.attr("data-facet-name");
		// if category is sort, don't do anything
		if (category === "sort") return; 

		var existingCategory = _.filter(this._hash, function( e ){ return e.category === category; });

		if (existingCategory.length === 1) {

			var $label = $('.filter-label[data-facet="'+category+'"]');

			//update value and data attribute
			$label.find('.name').html(name);
			data = facet;
			$label.attr('data-facet-name', data);	

			this._hash = _.without(this._hash, _.findWhere(this._hash, {category: category}));
		} else {
 			if (this._hash.length === 0) $('.filter-info').addClass('hasFilter');

			this.$el.append(this.template({category:category, name: name, facet: facet}));
		}
		this._hash.push({category: category, name: name, facet:facet});

	}
});
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
		$("#Slider").slider("value", years[0], years[1]);
	}
})

// slider from http://egorkhmelev.github.com/jslider/
APP.SortView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
	      
	    '<div class="sort-label"> sort' +
		'<div class="sort-options-wrapper">' + 
	      '<ul class="sort-by">' + 
	         '{{#each sort}}' +
	         	'<li class="facet option-sort" data-facet="sort" data-facet-name="{{this.facet}}">{{this.title}}</li>' +
	         '{{/each}}' +
	        '</ul>' +
	     '</div>' + 
	     '</div>'
	),

	events: {
		'click .sort-label': 'clickSortLabel',
	    'click .option-sort': 'selectionChanged',
	},	

	initialize: function () {
		this.render();
		Backbone.controller.on('checkSort', this.updateSort, this);
	},

	render: function () {
        var self = this;
        var col = self.collection;
     	this.$el.append(this.template(col));
	},

	updateSort: function(obj) {
		var $el = $('.facet[data-facet-name="'+obj.param+'"]');
		//set selection
		$el.prop('selected', true);
		$el.addClass('active');
	},

	clickSortLabel: function(e) {
		e.preventDefault();
		var $el = $(e.target);

		if ( $el.hasClass("selected") ) {
 			$el.removeClass("selected"); 
		} else {
			 $el.addClass("selected");
		}
	},

   selectionChanged: function( e ) {
      e.preventDefault();
      var $el = $(e.target);

    	this.trigger("sorted_Changed", {target: $el});
    	$('.sort-label').removeClass("selected"); 
  },

})
APP.Router = Backbone.Router.extend({
	prev: false,

	routes: {
    "!/"                       : "index",
    "!/search"                 : "filterResults"
 },

 initialize: function() {
   var self = this;

      // get and display the facets
      APP.facets = new APP.Facets();
      APP.facets.fetch({
         success: function (facets, response, options) {
            APP.facetsData = facets;
            APP.facets.trigger("dataLoaded");
         }
      });

      // when the data is loaded, set view
      APP.facets.on("dataLoaded", function() {  

       var masterView = new APP.FacetsMasterView({
        collection: APP.facetsData
     });

       self.startRouter();
    })

      //get the collection data 
      APP.graphics = new APP.Graphics();
      APP.graphics.fetch({
         success: function (collection, response, options) {
            APP.collectionData = collection;   
            APP.graphics.trigger("dataLoaded");
         }
      });

      // trigger rendergraphics when data is loaded
      APP.graphics.on("dataLoaded", function() {
         self.renderGraphics(APP.collectionData);
         self.startRouter();
      })

      //initialze the scrollviews
      APP.scroll = new APP.ScrollView();
   },

    startRouter: function() {  //starts the router after both renders are done
      if (APP.router.prev){
         Backbone.history.start(); 

      } else {
         APP.router.prev = true;
      }
   },

   renderGraphics: function(collection) {
      APP.graphicCollectionView = new APP.GraphicCollectionView ({
       collection: collection,
       el: $(".graphics-wrapper")
    });
      this.currentCollection = APP.collectionData;
      APP.graphicCollectionView.render();
   },

   filterResults:function(params) {
      var self = this;
      var newCollection = this.search(params);

      // Get All the Facets from Param
      var _paramsArray = [],
      _paramsValueArray = [];
      $facets = $('.facet');

        //TODO this removing class could be done smarter;
        $facets.removeClass('active'); 

        _.each(params, function(value, key){
           _paramsArray.push(key);
           _paramsValueArray.push(value);
        });

      // Get All the Available Facets
            
            // var _facetArray = new Array();
            
            // $facets.filter(function(i, k){
            //    var key = $(this).data('facet');
            //    var value = $(this).data('facet-name');

            //    if (_.findWhere(_facetArray, key) == null) {
            //          _facetArray.push({key: key, value: value});
            //    }
            // });


            // var _excludedFacet = _.without(_facetArray, _paramsArray),
            //     _availableFacets = new Array();

            
            // _.each(_excludedFacet, function(value, key){        
            //   newCollection.filter(function(doc){  
            //   doc = doc.get(value.value);
            //    _availableFacets.push(doc);          
            //   });        
            // });

            // console.log(_availableFacets);


            // _availableFacets.push(_paramsValueArray);
            // _availableFacets = _.flatten(_availableFacets); 
            
            // var $f = $facets.removeClass("disabled").filter(function(i, k){
            //    var facet_name = $(i).data('facet-name');
            //   return _.indexOf(_availableFacets, facet_name) == -1? true: false;
              
            // }).addClass("disabled");
      

        // set active or inactive
        if (_paramsValueArray.length){

          var _facets = _.filter($facets, function(i, k){
             var facet_name = $(i).data('facet-name');

             //workaround for the independent variables such as 'opendata'
             if (facet_name === 1) { 
                facet_name = $(i).data('facet');
                return _.indexOf(_paramsArray, facet_name) != -1 ? true: false;
              } else {
                return _.indexOf(_paramsValueArray, facet_name) != -1 ? true: false;
              }
          });



          _.each(_facets, function(facet){
            Backbone.controller.trigger('selectedFilter', {el: facet, arr:_facets});
         })

          // Add Active Class to Selected Facet
          $(_facets).addClass("active");
       }

       this.renderGraphics( newCollection );
    },

   search: function(params){
      var newCollection = APP.collectionData;
      
      newCollection = newCollection.byFilters(params);

      return newCollection;
    },


   notFound: function() {
      console.log ("404 message here");
   },

   index: function (e) {
      var self = this;

      //removes all clases
      $('.facet').removeClass('active');     
      self.renderGraphics (APP.collectionData);

      // removes all selected filters in breadcrumb
      Backbone.controller.trigger('removeFilters');
   }
});

APP.router = new APP.Router();