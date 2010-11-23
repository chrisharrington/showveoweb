Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the template  page.
//
Showveo.Controllers.TemplateController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The view.
	var _view;

	//	The model.
	var _model;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	model:				The model.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;

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

	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.TemplateController.prototype = new Showveo.Controllers.Base;
});
