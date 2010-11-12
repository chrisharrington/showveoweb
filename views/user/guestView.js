Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The view for the user-guest control.
//
Showveo.Views.UserGuestView = function(parameters) {


	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the control.
	var _components;

	//	The event handlers.
	var _handlers;

	//	The feedback control.
	var _feedback;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the handler for the sign in event.
	this.onSignIn = function(handler) { _handlers["onSignIn"] = handler; };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	model:						The user-guest model.
	//	feedback:					The feedback control.
	//
	_feedback = parameters.feedback;
	this.initialize = function(parameters) {
		_handlers = {};
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user fires a sign in event.  Retrieves the email address and password to send to the controller.
	//
	var onSignIn = function() {
		_handlers["onSignIn"](_components.textEmailAddress.clearbox("value"), _components.textPassword.clearbox("value"));
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the common components for the control.
	//	view:						The loaded html for the view.
	//
	this.loadComponents = function(view) {
		_components = {};
		_components.view = view;
		_components.textEmailAddress = view.find("input[type='text']:first").clearbox().enter(onSignIn);
		_components.textPassword = view.find("input[type='password']:last").clearbox().enter(onSignIn);
		_components.buttonSignIn = view.find("button").click(onSignIn);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Views.UserGuestView.prototype = new Showveo.Views.Base;
});