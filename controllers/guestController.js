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

	//	Reads and writes cookies.
	var _cookie;

	//	Fired after the user has signed in.
	var _onSignIn;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	model:				The model.
	//	cookie:				Reads and writes cookies.
	//	onSignIn:			Fired after the user has signed in.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;
		_cookie = parameters.cookie;
		_onSignIn = parameters.onSignIn;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Called after the controller has loaded.
	//
	this.loaded = function() {

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

			_cookie.write("identity", user.identity);
			_onSignIn(user);
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
