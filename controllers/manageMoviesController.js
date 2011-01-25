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
		_model.getUncategorizedMovies();
		_model.getAllGenres();

		loadHandlers();

		if (state.length == 1)
			_view.selectTab(state[0]);
		else
			selectGenre(state[1]);
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
		_model.setMovieFavorite(movie);
	};

	//
	//	Fired after the user has selected a movie genre to view.
	//	genre:				The genre to view.
	//
	var onGenreSelected = function(genre) {
		selectGenre(genre);
	};

	//
	//	Fired after the user has performed a search for uncategorized movies.
	//	query:				The search query.
	//
	var onSearch = function(query) {
		_model.movieSearch(query);	
	};

	//
	//	Fired after the user has changed genres in the genres tab.  Populates the genres tab with movies from the
	//	selected genre.
	//	genre:				The new genre.
	//
	var onGenreChanged = function(genre) {
		_model.getMoviesByGenre(genre);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common handlers for the controller.
	//
	var loadHandlers = function() {
		_view.onMovieDeleted(onMovieDeleted);
		_view.onMovieFavoriteChanged(onMovieFavoriteChanged);
		_view.onMovieSelected(_onMovieSelected);
		_view.onGenreSelected(onGenreSelected);
		_view.onTabSelected(_onTabSelected);
		_view.onSearch(onSearch);
		_view.onGenreChanged(onGenreChanged);
		_view.onUncategorizedMovieSelected(function(uncategorizedMovie, selectedMovie) {
			_model.categorize(uncategorizedMovie, selectedMovie, function() {
				_model.getRecentlyUploadedMovies();
				_model.getMoviesByGenre("Action");
				_model.getAllMovies();
				_model.getFavoriteMovies();
			});
		});
	};

	//
	//	Selects the genre tab.
	//	genre:				The name of the genre to select.
	//
	var selectGenre = function (genre) {
		_view.selectTab("genres");
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.ManageMoviesController.prototype = new Showveo.Controllers.Base;
});
