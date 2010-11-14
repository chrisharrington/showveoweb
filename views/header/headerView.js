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

    //  Sets the handler for the sign out event.
    this.onSignOut = function(handler) { _handlers["onSignOut"] = handler; };

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

		_components.panelGuest = view.find("div.guest");
		_components.textEmailAddress = view.find("div.guest>input[type='text']:first").clearbox().enter(onSignIn);
		_components.textPassword = view.find("div.guest>input[type='password']:last").clearbox().enter(onSignIn);
		_components.buttonSignIn = view.find("div.guest>button").click(onSignIn);

		_components.panelUser = view.find("div.user");
		_components.panelAccount = _components.panelUser.find(">div.account");
		_components.labelName = _components.panelAccount.find("b");
		_components.linkSignOut = _components.panelAccount.find("a").click(_handlers["onSignOut"]);
	};

	//
	//	Called by the controller after a user has been successfully signed in.  Hides the sign in control and displays
	//	the user's account control.
	//	user:						The signed in user.
	//
	this.signedIn = function(user) {
		_components.panelGuest.fadeOut(200, function() {
			_components.labelName.text(user.firstName);			
			_components.panelUser.fadeIn(200);
		});
	};

	//
	//	Called by the controller after the user has signed out.  Hides the user panel and shows the guest panel.
	//
	this.signedOut = function() {
		_components.panelUser.fadeOut(200, function() {
			_components.textEmailAddress.clearbox("reset");
			_components.textPassword.clearbox("reset");
			_components.panelGuest.fadeIn(200);
		});
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Views.HeaderView.prototype = new Showveo.Views.Base;
});