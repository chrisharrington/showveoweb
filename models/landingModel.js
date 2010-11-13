Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the landing page.
//
Showveo.Models.LandingModel = function(parameters) {

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
	Showveo.Models.LandingModel.prototype = new Showveo.Models.Base;
});
