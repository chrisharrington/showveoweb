Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The view for the header control.
//
Showveo.Views.HeaderView = function(parameters) {


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
	//	model:						The header model.
	//	feedback:					The feedback control.
	//
	this.initialize = function(parameters) {
		_feedback = parameters.feedback;
		_handlers = {};
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the header fires a sign in event.  Retrieves the email address and password to send to the controller.
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
	Showveo.Views.HeaderView.prototype = new Showveo.Views.Base;
});