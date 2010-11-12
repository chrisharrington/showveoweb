Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the header control.
//
Showveo.Models.HeaderModel = function(parameters) {

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
	//	Attempts to retrieve a header by email address and password.  Invalid credentials result in nothing passed to the
	//	callback function, while valid credentials executes the callback with the retrieved header.
	//	emailAddress:				The email address of the header.
	//	password:					The password of the header.
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
				dataType: "json",
				fixture: function() {
					if (emailAddress == "q")
						return [];

					return [{
						id: 1,
						firstName: "Chris",
						lastName: "Harrington",
						emailAddress: "chrisharrington99@gmail.com",
						password: "",
						identity: "areallylongidentity"
					}];
				}
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
	Showveo.Models.HeaderModel.prototype = new Showveo.Models.Base;	
});