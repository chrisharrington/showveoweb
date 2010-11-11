Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The view for the user-guest control.
//
Showveo.Views.UserGuestView = function(parameters) {


	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the control.
	var _components;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	model:						The user-guest model.
	//	feedback:					The feedback control.
	//
	this.initialize = function(parameters) {
		
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the common components for the control.
	//	view:						The loaded html for the view.
	//
	this.loadComponents = function(view) {
		_components = {};
		_components.view = view;

		alert("view loaded");
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	this.base_initialize(parameters);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Views.UserGuestView.prototype = new Showveo.Views.Base;
});