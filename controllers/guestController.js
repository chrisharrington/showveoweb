Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the guest page.
//
Showveo.Controllers.GuestController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The view.
	var _view;

	//	The model.
	var _model;

	//	The header control.
	var _header;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	model:				The model.
	//	header:				The header control.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;
		_header = parameters.header;

		loadHandlers();

		_header.onSignIn(onSignIn);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the header control reports that the user has initiated a sign in attempt.  Validates the user's
	//	input and sends the request to the model.
	//	emailAddress:		The user's email address.
	//	password:			The user's password.
	//
	var onSignIn = function(emailAddress, password) {
		var error;
		if (emailAddress == "" && password == "")
			error = "Both your email address and password are required for sign in.";
		else if (emailAddress == "")
			error = "Your email address is required for sign in.";
		else if (password == "")
			error = "Your password is required for sign in.";

		if (error) {
			_view.error(error);
			return;
		}

		_model.signIn(emailAddress, password, function(user) {
			if (!user) {
				_view.error("The credentials specified correspond to no user.");
				return;
			}

			_header.signedIn(user);
		});
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the handlers for the controller.
	//
	var loadHandlers = function() {

	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.GuestController.prototype = new Showveo.Controllers.Base;
});
