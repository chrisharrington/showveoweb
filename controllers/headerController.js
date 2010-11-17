Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the guest page.
//
Showveo.Controllers.HeaderController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The view.
	var _view;

	//	The model.
	var _model;

	//	Reads and writes cookies.
	var _cookie;

	//	Fired after the user has signed in.
	var _onSignIn;

	//	Fired after the user signs out.
	var _onSignOut;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	model:				The model.
	//	cookie:				Reads and writes cookies.
	//	onSignIn:			Fired after the user has signed in.
	//	onSignOut:			Fired after the user signs out.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;
		_cookie = parameters.cookie;
		_onSignIn = parameters.onSignIn;
		_onSignOut = parameters.onSignOut;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Called after the controller has loaded.
	//
	this.loaded = function() {
		var identity = _cookie.read("identity");
		if (!identity)
			_this.guest();
		else {
			_model.signInWithIdentity(identity, function(user) {
				_onSignIn(user);
				_this.user(user);
			});
		}
	};

	//
	//	Indicates that there is no user currently logged in.  Shows the guest panel.
	//
	this.guest = function() {
		_view.guest();
	};

	//
	//	Indicates that a logged in user has arrived and that the user panel should be shown.
	//	user:				The logged in user.
	//
	this.user = function(user) {
		_view.user(user);
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

	//
	//	Fired after the headre control reports that the user wishes to sign out.
	//
	var onSignOut = function() {
		_cookie.remove("identity");
		_onSignOut();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the handlers for the controller.
	//
	var loadHandlers = function() {
		_view.onSignIn(onSignIn);
		_view.onSignOut(onSignOut);
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.HeaderController.prototype = new Showveo.Controllers.Base;
});
