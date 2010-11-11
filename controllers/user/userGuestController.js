Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the user-guest control.
//
Showveo.Controllers.UserGuestController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the controller.
	var _components;

	//	The feedback control.
	var _feedback;
	
	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	feedback:						The feedback control.
	//
	this.initialize = function(parameters) {
		
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	this.base_initialize(parameters);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.UserGuestController.prototype = new Showveo.Controllers.Base;
});