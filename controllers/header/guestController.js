Showveo.Validator.validateNamespace("Showveo.Controllers");

/*
	A controller used to manipulate the guest view.
 */
Showveo.Controllers.GuestController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//
	this.initialize = function(parameters) {
		
	}

	this.base_initialize(parameters);
	this.initialize(parameters);
};

Showveo.Controllers.GuestController.prototype = new Showveo.Controllers.Base;