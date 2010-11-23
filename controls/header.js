Showveo.Validator.validateNamespace("Showveo.Controls");

//
//	A control used to manage the header portion of the page.
//
Showveo.Controls.Header = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components.
	var _components;

	//	The sign in event handler.
	var _onSignIn;

	//	The sign out event handler.
	var _onSignOut;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:					The panel containing the control elements.
	//	onSignIn:				The sign in event handler.
	//	onSignOut:				The sign out event handler.
	//
	this.initialize = function(parameters) {
		_onSignIn = parameters.onSignIn;
		_onSignOut = parameters.onSignOut;

		loadComponents(parameters.panel);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Tells the header control that a guest is the current user.  Displays the guest panel, including the controls
	//	used to allow the guest to sign in.
	//
	this.guest = function() {
		_components.panelUser.fadeOut(200, function() {
			_components.textEmailAddress.clearbox("reset");
			_components.textPassword.clearbox("reset");
			_components.panelGuest.fadeIn(200);
		});
	};

	//
	//	Tells the header control that a signed in user is the current user.  Displays the user panel, along with the
	//	user's basic information.
	//	user:					The signed in user.
	//
	this.user = function(user) {
		_components.panelGuest.fadeOut(200, function() {
			_components.labelName.text(user.firstName);
			_components.panelUser.fadeIn(200);
		});
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common components.
	//	panel:					The panel containing the control elements.
	//
	var loadComponents = function(panel) {
		_components = {};
		_components.panel = panel;

		_components.panelUser = panel.find("div.userheader");
		_components.labelName = _components.panelUser.find("b");
		_components.linkSignOut = _components.panelUser.find("a").click(_onSignOut);

		var callback = function() {
			_onSignIn(_components.textEmailAddress.clearbox("value"), _components.textPassword.clearbox("value"));
		};

		_components.panelGuest = panel.find("div.guestheader");
		_components.textEmailAddress = _components.panelGuest.find("input[type='text']").clearbox().enter(callback);
		_components.textPassword = _components.panelGuest.find("input[type='password']").clearbox().enter(callback);
		_components.buttonSignIn = _components.panelGuest.find("button").click(callback);
	};

	this.initialize(parameters);
};
