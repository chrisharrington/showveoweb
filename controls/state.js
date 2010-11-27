Showveo.Validator.validateNamespace("Showveo.Controls");

//
//	A control used to read and validate the state of the application.
//
Showveo.Controls.State = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The collection of controllers.
	var _controllers;

	//	The identity of the logged in user.
	var _identity;

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//l
	//	Loads the correct controller based on the hash of the url.
	//	controllers:				The collection of controllers.
	//	identity:					The identity of the logged in user.
	//
	this.load = function(controllers, identity) {
		_controllers = controllers;
		_identity = identity;

		_controllers.HeaderController.load();
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
			switch (parts[0]) {
				case "movies": handleMovies(parts[1] ? parts[1] : ""); break;
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

	//
	//	Handles loading a movie page.
	//	state:						The movie state.
	//
	var handleMovies = function(state) {
		_controllers.ManageMoviesController.load(state);
	};
};
