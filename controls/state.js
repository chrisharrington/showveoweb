Showveo.Validator.validateNamespace("Showveo.Controls");

//
//	A control used to read and validate the state of the application.
//
Showveo.Controls.State = function() {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The collection of controllers.
	var _controllers;

	//	The identity of the logged in user.
	var _identity;

	//	A flag used to determine if the application should be refreshed.
	var _refresh;

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Initializes the state manager.
	//	controllers:				The collection of controllers.
	//	identity:					The identity of the logged in user.
	//
	this.initialize = function(controllers, identity) {
		_controllers = controllers;
		_identity = identity;
		_refresh = true;

		$(window).hashchange(function() {
			if (_refresh)
				load();
			_refresh = true;
		});

		_controllers.HeaderController.load(identity);
		if (!identity)
			_controllers.GuestController.load();
	};

	//
	//	Loads the correct controller based on the hash of the url.
	//
	this.load = function() {
		load();
	};

	//
	//	Called after a user has signed in.  Shows the default landing page for the user.
	//	user:						The signed in user.
	//
	this.signIn = function(user) {
		_controllers.HeaderController.user(user);
		load();
	};

	//
	//	Called after a user has signed out.  Redirects the user to the landing page.
	//
	this.signOut = function() {
		_controllers.GuestController.load();
		_controllers.HeaderController.guest();
	};

	//
	//	Retrieves the current state of the application.
	//	Returns:					The current state of the application.
	//
	this.getState = function() {
		return window.location.hash;
	};

	//
	//	Sets the state and refreshes the application.
	//	state:						The new state of the application.
	//
	this.setStateRefresh = function(state) {
		_refresh = true;
		window.location.hash = state;
	};

	//
	//	Sets the state of the application without refreshing it.
	//	state:						The new state of the application.
	//
	this.setState = function(state) {
		_refresh = false;
		window.location.hash = state;
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the state as read from the hash.
	//
	var load = function () {
		var hash = window.location.hash;
		if (!hash || hash.substring(1) == "")
			loadDefault();
		else {
			var state = hash.substring(1);
			var parts = state.split("/");
			var substate = parts[1] ? parts.slice(1, parts.length) : "";
			switch (parts[0]) {
				case "movie": _controllers.MovieDetailsController.load(substate); break;
				case "movies": _controllers.ManageMoviesController.load(substate); break;
				default: loadDefault(); break;
			}
		}
	};

	//
	//	Loads the pages when no state is defined.
	//
	var loadDefault = function () {
		if (!_identity)
			_controllers.GuestController.load();
	};
};
