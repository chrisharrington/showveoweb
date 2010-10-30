Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the add movie page.
//
Showveo.Models.AddMovieModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The api key required to retrieve movie information from TMDB.org.
	var _apikey;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	apikey:								The api key required to retrieve movie information from TMDB.org.
	//
	//
	this.initialize = function(parameters) {
		_apikey = parameters.apikey;
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Searches for movie information.
	//	name:								The name of the movie to search for.
	//	handlers:							The event handlers.
	//
	this.search = function(name) {
		$.ajax({
			url: encodeURI("http://localhost/showveoservice/moviedataservice.svc/search/" + name),
			dataType: "json",
			success: function(movies) { _this.notify("searchResults", movies); },
			error: function(error) { _this.notify("error", "An error has occurred while retrieving your movie list.  Sorry!"); }
		});
	}

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Models.AddMovieModel.prototype = new Showveo.Models.Base;