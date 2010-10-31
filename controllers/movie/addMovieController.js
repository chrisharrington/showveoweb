Showveo.Validator.validateNamespace("Showveo.Controllersr");

//
//	A controller used to provide event delegation for adding a movie.
//
Showveo.Controllers.AddMovieController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the controller.
	var _components;

	//	The view for the controller.
	var _view;
	
	//	The model for the controller.
	var _model;

	//	The feedback control.
	var _feedback;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:							The add movie view.
	//	model:							The add movie model.
	//	feedback:						The feedback control.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;
		_components = {};

		loadHandlers();
	}
	
	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user initiates a movie search.  Displays the movie search control filled with search results.
	//	name:							The name of movie for which to search.
	//	start:							The position at which to begin retrieving results.
	//	count:							The number of results to retrieve.
	//
	var onSearch = function(name, start, count) {
		if (name == "") {
			_view.error("Please enter the name of a movie to search for.");
			return;
		}

		_model.search(name, start, count);
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the handlers for the controller.
	//
	var loadHandlers = function() {
		_view.onSearch(onSearch);
	}

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Controllers.AddMovieController.prototype = new Showveo.Controllers.Base;
