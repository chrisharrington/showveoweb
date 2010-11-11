Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the user guest control.
//
Showveo.Models.UserGuestModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//
	this.initialize = function(parameters) {
			
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.UserGuestModel.prototype = new Showveo.Models.Base;	
});