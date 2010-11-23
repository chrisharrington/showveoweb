Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the landing page.
//
Showveo.Controllers.LandingController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The view.
	var _view;

	//	The model.
	var _model;

	//	The user's identity.
	var _identity;

	//	The callback function to execute once the user has selected a movie panel.
	var _onMovieSelection;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	model:				The model.
	//	identity:			The user's identity.
	//	onMovieSelection:	The callback function to execute once the user has selected a movie panel.
	//	onSignIn:			The callback function to execute once the user has been retrieved.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;
		_identity = parameters.identity;
		_onMovieSelection = parameters.onMovieSelection;
		_onSignIn = parameters.onSignIn;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Called after the controller has loaded.
	//
	this.loaded = function() {
		
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common handlers for the controller.
	//
	var loadHandlers = function() {
		_view.onMovieSelection(_onMovieSelection);
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.LandingController.prototype = new Showveo.Controllers.Base;
});
