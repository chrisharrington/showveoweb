Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the user guest control.
//
Showveo.Models.UserGuestModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The url of the service used to retrieve and update data.
	var _service;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	service:					The url of the service used to retrieve and update data.
	//
	this.initialize = function(parameters) {
		_service = parameters.service;	
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Attempts to retrieve a user by email address and password.  Invalid credentials result in nothing passed to the
	//	callback function, while valid credentials executes the callback with the retrieved user.
	//	emailAddress:				The email address of the user.
	//	password:					The password of the user.
	//	success:					The callback function.
	//
	this.signIn = function(emailAddress, password, success) {
		try {
			if (!success)
				throw "signin - Missing success callback.";

			$.ajax({
				url: _service + "/signin",
				data: { emailAddress: emailAddress, password: password },
				success: function(data, status, request) { success(data); },
				dataType: "json"
			});
		} catch (exception) {
			if (error)
				error(exception);
		}
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.UserGuestModel.prototype = new Showveo.Models.Base;	
});