Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the user-guest control.
//
Showveo.Controllers.UserGuestController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the controller.
	var _components;

	//	The feedback control.
	var _feedback;

	//	The view.
	var _view;

	//	The model.
	var _model;
	
	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:							The view for the controller.
	//	model:							The model for the controller.
	//	feedback:						The feedback control.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the view reports a sign in event.  Verifies the user's credentials and performs a sign in operation.
	//	emailAddress:					The user's email address.
	//	password:						The user's password.
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
						throw "The credentials specified correspond to no user.";

					alert("success!");
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
	Showveo.Controllers.UserGuestController.prototype = new Showveo.Controllers.Base;
});