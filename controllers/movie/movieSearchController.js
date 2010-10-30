Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the movie search functionality.
//
Showveo.Controllers.MovieSearchController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the controller.
	var _components;

	//	The model for the controller.
	var _model;

	//	The feedback control.
	var _feedback;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:							The movie search view.
	//	model:							The movie search model.
	//	feedback:						The feedback control.
	//
	this.initialize = function(parameters) {
		_model = parameters.model;
		_feedback = parameters.feedback;
		_components = {};
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the components for the controller.
	//	view:							The movie search view.
	//
	this.loadComponents = function(view) {

	}

}

Showveo.Controllers.MovieSearchController.prototype = new Showveo.Controllers.Base;