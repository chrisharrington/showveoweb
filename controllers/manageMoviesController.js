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

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	model:				The model.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Called after the controller has loaded.
	//
	this.loaded = function() {
		_model.getRecentlyUploadedMovies();
		_model.getFavoriteMovies();
		_model.getAllMovies();

		_view.onMovieDeleted(onMovieDeleted);
		_view.onMovieFavorited(onMovieFavorited);
		_view.onGenreSelected(onGenreSelected);
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
	//	Fired after the use rhas requested that a movie be added to his or her favorites.
	//	movie:				The movie to be favorited.
	//
	var onMovieFavorited = function(movie) {
		alert("favorite " + movie.id);
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
