Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The view for the landing page.
//
Showveo.Views.LandingView = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the view.
	var _components;

	//	The event handlers.
	var _handlers;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the event handler for when the user clicks the movie panel.
	this.onMovieSelection = function(handler) { _handlers["onMovieSelection"] = handler; };

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

		_components.panelGuest = view.find("div.guestpanel");

		_components.panelUser = view.find("div.userpanel");
		_components.panelMovie = _components.panelUser.find("div.movies").click(_handlers["onMovieSelection"]);
	};

	//
	//	Indicates that a user has signed in.  Hides the guest panel and shows the user panel.
	//	initial:				A flag indicating that the sign in operation occurred at application load.
	//
	this.signIn = function(initial) {
		var fade = initial ? 0 : 200;
		_components.panelGuest.fadeOut(fade, function() {
			_components.panelUser.fadeIn(fade);
		});
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Views.LandingView.prototype = new Showveo.Views.Base;
});

