Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the guest page.
//
Showveo.Models.GuestModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The service location.
	var _service;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	service:				The service location.
	//
	this.initialize = function(parameters) {
		_service = parameters.service;
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.GuestModel.prototype = new Showveo.Models.Base;	
});