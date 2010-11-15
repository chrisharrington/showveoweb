Showveo.Validator.validateNamespace("Showveo.Controls");

//
//	A control used to manage the header portion of the page.
//
Showveo.Controls.Header = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components.
	var _components;

	//	The cookie manager.
	var _cookie;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the sign in event handler.
	this.onSignIn = function(handler) {
		var callback = function() {
			handler(_components.textEmailAddress.clearbox("value"), _components.textPassword.clearbox("value"));
		};

		_components.textEmailAddress.enter(callback);
		_components.textPassword.enter(callback);
		_components.buttonSignIn.click(callback);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:					The panel containing the control elements.
	//	cookie:					The cookie manager.
	//	onSignIn:				The handler to execute on a sign in attempt.
	//
	this.initialize = function(parameters) {
		_cookie = parameters.cookie;

		loadComponents(parameters.panel);
		loadUser();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Tells the header control that a user has successfully signed in.  Hides the guest panel and shows the user
	//	panel.
	//	user:					The signed in user.
	//
	this.signedIn = function(user) {
		_components.panelGuest.fadeOut(200, function() {
			_components.labelName.text(user.firstName);
			_components.panelUser.fadeIn(200);

			_cookie.write("identity", user.identity);
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

		_components.panelGuest = panel.find("div.guestheader");
		_components.textEmailAddress = _components.panelGuest.find("input[type='text']").clearbox();
		_components.textPassword = _components.panelGuest.find("input[type='password']").clearbox();
		_components.buttonSignIn = _components.panelGuest.find("button");
	};

	//
	//	Loads the currently logged in user.
	//
	var loadUser = function() {
		var identity = _cookie.read("identity");
		if (identity) {
			
		}
		else
			_components.panelGuest.show();
	};

	this.initialize(parameters);
};
