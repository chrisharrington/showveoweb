Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the header control.
//
Showveo.Controllers.HeaderController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the controller.
	var _components;

	//	The feedback control.
	var _feedback;

	//	Reads and writes cookies.
	var _cookie;

	//	The view.
	var _view;

	//	The model.
	var _model;

	//	The callback function to execute once a user has signed in.
	var _onSignIn;
	
	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:							The view for the controller.
	//	model:							The model for the controller.
	//	feedback:						The feedback control.
	//	cookie:							Reads and writes cookies.
	//	onSignIn:						The callback function to execute once a user has signed in.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;
		_cookie = parameters.cookie;
		_onSignIn = parameters.onSignIn;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the view reports a sign in event.  Verifies the header's credentials and performs a sign in operation.
	//	emailAddress:					The header's email address.
	//	password:						The header's password.
	//
	var onSignIn = function(emailAddress, password) {
		try {
			if (emailAddress == "" && password == "")
				throw "Both your email address and your password are required.";
			if (emailAddress == "")
				throw "Your email address is required.";
			if (password == "")
				throw "Your password is required.";

			_model.signIn(emailAddress, password, function(user) {
				try {
					if (!user)
						throw "The credentials specified correspond to no header.";

					_cookie.write("identity", user.identity);
					_view.signedIn(user);

					if (_onSignIn)
						_onSignIn(user);
				} catch (error) {
					_view.error(error);
				}
			}, function(error) {
				_view.error(error);
			});
		} catch (error) {
			_view.error(error);
		}
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the handlers for the controller.
	//
	var loadHandlers = function() {
		_view.onSignIn(onSignIn);
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.HeaderController.prototype = new Showveo.Controllers.Base;
});