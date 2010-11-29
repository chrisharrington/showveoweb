Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the manage movies  page.
//
Showveo.Controllers.ManageMoviesController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The view.
	var _view;

	//	The model.
	var _model;

	//	The event handler to execute once the user has selected a movie tab.
	var _onTabSelected;

	//	The event handler to execute once the user has selected a movie.
	var _onMovieSelected;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	model:				The model.
	//	onTabSelected:		The event handler to execute once the user has selected a movie tab.
	//	onMovieSelected:	The event handler to execute once the user has selected a movie.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;
		_onTabSelected = parameters.onTabSelected;
		_onMovieSelected = parameters.onMovieSelected;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Called after the controller has loaded.
	//	state:				The state of the application.
	//
	this.loaded = function(state) {
		_model.getRecentlyUploadedMovies();
		_model.getFavoriteMovies();
		_model.getMoviesByGenre("Action");
		_model.getAllMovies();

		_view.onMovieDeleted(onMovieDeleted);
		_view.onMovieFavoriteChanged(onMovieFavoriteChanged);
		_view.onMovieSelected(_onMovieSelected);
		_view.onGenreSelected(onGenreSelected);
		_view.onTabSelected(_onTabSelected);

		_view.selectTab(state.replace("movies/", ""));
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user has requested that a movie be deleted.
	//	movie:				The movie to be deleted.
	//
	var onMovieDeleted = function(movie) {
		alert("delete " + movie.id);	
	};

	//
	//	Fired after the user has requested that a movie be added to or removed from his or her favorites.
	//	movie:				The movie to be favorited or unfavorited.
	//
	var onMovieFavoriteChanged = function(movie) {
		alert("favorite " + movie.id);
	};

	//
	//	Fired after the user has selected a movie.
	//	movie:				The selected movie.
	//
	var onMovieSelected = function(movie) {
		alert("selected " + movie.id);	
	};

	//
	//	Fired after the user has selected a movie genre to view.
	//	genre:				The genre to view.
	//
	var onGenreSelected = function(genre) {
		alert("genre " + genre);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common handlers for the controller.
	//
	var loadHandlers = function() {

	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.ManageMoviesController.prototype = new Showveo.Controllers.Base;
});
