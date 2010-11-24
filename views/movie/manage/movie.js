
Showveo.Validator.validateNamespace("Showveo.Views.Movie.Manage");

//
//	A control used to wrap a movie panel.
//
Showveo.Views.Movie.Manage.Movie = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//  The common components for the control.
	var _components;

	//  The wrapped movie.
	var _movie;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//  The default constructor.
	//  panel:                      The panel containing the control elements.
	//  movie:                      The wrapped movie.
	//
	this.initialize = function(parameters) {
		_movie = parameters.movie;

		loadComponents(parameters.panel);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//  Loads the common components for the control.
	//  panel:                      The panel containing the control elements.
	//
	var loadComponents = function(panel) {
		_components = {};
		_components.panel = panel;

		_components.linkFavorite = panel.find(">div>div>img:first").tooltip("right");
		_components.linkDelete = panel.find(">div>div>img:last").tooltip("right");
	};

	this.initialize(parameters);
};//