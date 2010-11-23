Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The view for the header control.
//
Showveo.Views.HeaderView = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the view.
	var _components;

	//	The event handlers.
	var _handlers;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the sign in handler.
	this.onSignIn = function(handler) { _handlers["onSignIn"] = handler; };

	//	Sets the sign out handler.
	this.onSignOut = function(handler) { _handlers["onSignOut"] = handler; };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//
	this.initialize = function(parameters) {
		_handlers = {};
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the common components for the view.
	//	view:					The html comprising the view.
	//
	this.loadComponents = function(view) {
		_components = {};

		_components.panelGuest = view.find("div.guestheader");
		_components.textEmailAddress = _components.panelGuest.find("input[type='text']").clearbox().enter(onSignIn);
		_components.textPassword = _components.panelGuest.find("input[type='password']").clearbox().enter(onSignIn);
		_components.buttonSignIn = _components.panelGuest.find("button").click(onSignIn);

		_components.panelUser = view.find("div.userheader");
		_components.labelName = _components.panelUser.find("b");
		_components.linkSignOut = _components.panelUser.find("a").click(_handlers["onSignOut"]);
	};

	//
	//	Shows the guest panel and hides the user panel.
	//
	this.guest = function() {
		_components.panelUser.fadeOut(200, function() {
			_components.panelGuest.fadeIn(200);
		});
	};

	//
	//	Shows the user panel and hides the guest panel.
	//	user:					The logged in user.
	//
	this.user = function(user) {
		_components.panelGuest.fadeOut(200, function() {
			_components.labelName.text(user.firstName);
			_components.panelUser.fadeIn(200);
		});
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user submits a sign in request.  Passes off to the controller to handle the sign in event.
	//
	var onSignIn = function() {
		_handlers["onSignIn"](_components.textEmailAddress.clearbox("value"), _components.textPassword.clearbox("value"));
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Views.HeaderView.prototype = new Showveo.Views.Base;
});