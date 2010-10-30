Showveo.Validator.validateNamespace("Showveo.Models");

//
//	A model used to provide data for the movie search page.
//
Showveo.Models.MovieSearchModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

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
	this.search = function(name, handlers) {
		$.ajax({
			url: encodeURI("http://localhost/showveoservice/moviedataservice.svc/search/" + name),
			dataType: "json",
			success: handlers.success,
			error: handlers.error
		});
	}
}
