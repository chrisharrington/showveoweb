Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the landing page.
//
Showveo.Controllers.LandingController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The view.
	var _view;

	//	The callback function to execute once the user has selected a movie panel.
	var _onMovieSelection;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	onMovieSelection:	The callback function to execute once the user has selected a movie panel.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_onMovieSelection = parameters.onMovieSelection;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	var loadHandlers = function() {
		_view.onMovieSelection(_onMovieSelection);
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.LandingController.prototype = new Showveo.Controllers.Base;
});
