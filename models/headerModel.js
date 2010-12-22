Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the header control.
//
Showveo.Models.HeaderModel = function(parameters) {

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
			url: _service + "/signin.data",
			data: { emailAddress: emailAddress, password: $.sha256(password) },
			dataType: "json",
			success: function(data) {
				callback(data);
			},
			error: function(error) { alert(error.status); }/*,
			fixture: function() {
				if (emailAddress == "q")
					return [];
				
				return [{
					id: 1,
					firstName: "Chris",
					lastName: "Harrington",
					identity: "areallylongidentity",
					password: "",
					emailAddress: "chrisharrington99@gmail.com"
				}];
			}*/
		});
	};

	//
	//	Retrieves a user by identity.
	//	identity:				The user's identity.
	//	callback:				The success callback.
	//
	this.signInWithIdentity = function(identity, callback) {
		if (!identity)
			callback();

		$.ajax({
			url: _service + "/signin/" + identity + ".data",
			dataType: "json",
			success: function(data) { callback(data); },
			fixture: function() {
				return [{
					id: 1,
					firstName: "Chris",
					lastName: "Harrington",
					identity: "areallylongidentity",
					password: "",
					emailAddress: "chrisharrington99@gmail.com"
				}];
			}
		});
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.HeaderModel.prototype = new Showveo.Models.Base;
});