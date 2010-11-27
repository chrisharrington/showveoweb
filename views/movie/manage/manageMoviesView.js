Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The view for the manage movies page.
//
Showveo.Views.ManageMoviesView = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the view.
	var _components;

	//	The factory used to create movie panels.
	var _moviePanelFactory;

	//	The event handlers.
	var _handlers;

	//	The event handler that's fired when the user requests that the movie be deleted.
	var _onMovieDeleted;

	//	The event handler that's fired when the user requests that the movie be placed in his or her favorites.
	var _onMovieFavorited;

	//	The event handler that's fired when the user clicks one of the movie's genre links.
	var _onGenreSelected;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the event handler for deleting a movie.
	this.onMovieDeleted = function(handler) { _components.tabs.onMovieDeleted(handler); };

	//	Sets the event handler for favoriting a movie.
	this.onMovieFavorited = function(handler) { _components.tabs.onMovieFavorited(handler); };

	//	Sets the event handler for selecting a movie genre.
	this.onGenreSelected = function(handler) { _components.tabs.onGenreSelected(handler); };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	moviePanelFactory:			The factory used to create movie panels.
	//
	this.initialize = function(parameters) {
		_moviePanelFactory = parameters.moviePanelFactory;
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
        _components.view = view;

		_components.panelLoading = view.find("div.loading");
		_components.panelRecentlyUploaded = view.find("div.tabs>div.recent>div.movies");

		_components.tabs = new Showveo.Views.Movie.Manage.MovieTabs({
			tabs: [{ name: "recent", title: "New Additions"}, { name: "favorites", title: "Favorites"}, { name: "all", title: "Browse" }],
			panel: view.find("div.tabs"),
			factory: _moviePanelFactory
		});
	};

	//
	//	Sets the list of recently uploaded movies.
	//	movies:					The recently uploaded movies.
	//
	this.recentlyUploadedMovies = function(movies) {
		_components.tabs.setMoviesForTab("recent", movies);
	};

	//
	//	Sets the list of favorite movies.
	//	movies:					The favorite movies.
	//
	this.favoriteMovies = function(movies) {
		_components.tabs.setMoviesForTab("favorites", movies);
	};

	//
	//	Sets the list of all movies.
	//	movies:					The list of all movies.
	//
	this.allMovies = function(movies) {
		_components.tabs.setMoviesForTab("all", movies);
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Views.ManageMoviesView.prototype = new Showveo.Views.Base;
});