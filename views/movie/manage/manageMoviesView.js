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

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the event handler for deleting a movie.
	this.onMovieDeleted = function(handler) { _components.tabs.onMovieDeleted(handler); };

	//	Sets the event handler for favoriting or unfavoriting a movie.
	this.onMovieFavoriteChanged = function(handler) { _components.tabs.onMovieFavoriteChanged(handler); };

	//	Sets the event handler for selecting a movie.
	this.onMovieSelected = function(handler) { _components.tabs.onMovieSelected(handler); };

	//	Sets the event handler for selecting a movie genre.
	this.onGenreSelected = function(handler) { _components.tabs.onGenreSelected(handler); };

	//	Sets the event handler for selecting a movie tab.
	this.onTabSelected = function(handler) { _components.tabs.onTabSelected(handler); };

	//	Sets the event handler for searching for movies for categorization.
	this.onSearch = function(handler) { _components.addMovie.onSearch(handler); };

	//	Sets the event handler for selecting an uncategorized movie's information.
	this.onUncategorizedMovieSelected = function(handler) { _components.addMovie.onUncategorizedMovieSelected(handler); };

	//	Sets the event handler to fire once the genre has been changed in the genres tab.
	this.onGenreChanged = function(handler) { _components.tabs.onGenreChanged(handler); };

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

		_components.addMovie = new Showveo.Controls.AddMovie.AddMovie({
			panel: $("div.addmovie")
		});

		_components.tabs = new Showveo.Views.Movie.Manage.MovieTabs({
			tabs: [{ name: "recent", title: "New Additions"}, { name: "favorites", title: "Favorites"}, { name: "genres", title: "Genres" }, { name: "all", title: "All" }, { name: "uncategorized", title: "Uncategorized" }],
			panel: view.find("div.tabs"),
			factory: _moviePanelFactory,
			uncategorized: view.find("div.uncategorized"),
			addMovie: _components.addMovie
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
	//	Sets the list of movies by genre.
	//	movies:					The movies list.
	//
	this.moviesByGenre = function(movies) {
		_components.tabs.setMoviesForTab("genres", movies);
	};

	//
	//	Sets the list of all movies.
	//	movies:					The list of all movies.
	//
	this.allMovies = function(movies) {
		_components.tabs.setMoviesForTab("all", movies);
	};

	//
	//	Sets the list of uncategorized movies.
	//	movies:					The list of uncategorized movies.
	//
	this.uncategorizedMovies = function(movies) {
		_components.tabs.setUncategorizedMovies(movies);	
	};

	//
	//	Selects the tab with the given name.
	//	name:					The tab to select.
	//
	this.selectTab = function(name) {
		if (name == "" || name == "/")
			name = "recent";
		_components.tabs.selectTab(name);	
	};

	//
	//	Indicates that the favorite status of a movie has been changed.
	//	movie:					The movie whose favorite status has been changed.
	//
	this.favoriteChanged = function(movie) {
		_components.tabs.updateMovie(movie);
	};

	//
	//	Loads the add movie search results with the given list of movies.
	//	movies:					The movie list.
	//
	this.searchResults = function(movies) {
		_components.addMovie.loadSearchResults(movies);	
	};

	//
	//	Sets the list of all genres.
	//	genres:					The list of genres.
	//
	this.genres = function(genres) {
		_components.tabs.setGenres(genres);	
	};

	//
	//	Indicates that an error has occurred while searching for movies.
	//	error;					The error message.
	//
	this.searchError = function(error) {
		_components.addMovie.error(error);	
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Views.ManageMoviesView.prototype = new Showveo.Views.Base;
});