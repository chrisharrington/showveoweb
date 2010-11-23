Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the add movie page.
//
Showveo.Models.AddMovieModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The service location.
	var _service;

	//	The api key required to retrieve movie information from TMDB.org.
	var _apikey;

	//	The search results container.
	var _results;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	apikey:								The api key required to retrieve movie information from TMDB.org.
	//	service:							The service location.
	//
	this.initialize = function(parameters) {
		_apikey = parameters.apikey;
		_service = parameters.service;
		_results = {};
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Searches for movie information.
	//	name:								The name of the movie to search for.
	//	start:								The position at which to start retrieving results.
	//	count:								The number of results to retrieve.
	//
	this.search = function(name, start, count) {
		if (_results[name]) {
			var slice = _results[name].slice(start, start+count)
			getDetailedInfo(slice);
			_this.notify("searchResults", slice);
			return;
		}

		_results = {};

		$.ajax({
			url: encodeURI(_service + "/search/" + name),
			dataType: "json",
			success: function(movies) {
				_results[name] = movies;

				_this.notify("searchResultsCount", movies.length);

				var slice = _results[name].slice(start, start+count)
				getDetailedInfo(slice);
				_this.notify("searchResults", slice);
			},
			error: function(error) { alert(error.responseText); _this.notify("error", "An error has occurred while retrieving your movie list.  Sorry!"); }
		});
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Retrieves detailed information for all of the movies given.  Notifies the view once detailed information for
	//	each movie comes in.
	//	movies:								The list of movies for which to retrieve detailed information.
	//
	var getDetailedInfo = function(movies) {
		$(movies).each(function(index, movie) {
			$.ajax({
				url: encodeURI(_service + "/info/" + movie.ID),
				dataType: "json",
				success: function(movie) { _this.notify("detailedInfo", movie); }
			});
		});
	}

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.AddMovieModel.prototype = new Showveo.Models.Base;	
});