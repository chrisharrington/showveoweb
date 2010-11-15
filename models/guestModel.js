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

	//
	//	Attempts to sign in a user.
	//	emailAddress:			The user's email address.
	//	password:				The user's password.
	//	callback:				The callback function.
	//
	this.signIn = function(emailAddress, password, callback) {
		$.ajax({
			url: _service + "/signin",
			data: { emailAddress: emailAddress, password: password },
			dataType: "json",
			success: function(data) { callback(data); },
			fixture: function() {
				if (emailAddress == "q")
					return [];

				return [{
					id: 1,
					firstName: "Chris",
					lastName: "Harrington",
					identity: "areallylongidentity",
					password: ""
				}];
			}
		});
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.GuestModel.prototype = new Showveo.Models.Base;	
});