
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

	//	The event handler that's fired when the user requests that the movie be deleted.
	var _onMovieDeleted;

	//	The event handler that's fired when the user requests that the movie be placed in or removed from his or her favorites.
	var _onMovieFavoriteChanged;

	//	The event handler that's fired when the user selects a movie.
	var _onMovieSelected;

	//	The event handler that's fired when the user clicks one of the movie's genre links.
	var _onGenreSelected;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the event handler for deleting a movie.
	this.onMovieDeleted = function(handler) { _components.linkDelete.click(function() { handler(_movie); }); };

	//	Sets the event handler for favoriting or unfavoriting a movie.
	this.onMovieFavoriteChanged = function(handler) {
		_components.linkFavorite.click(function() {
			_movie.isFavorite = !_movie.isFavorite;
			_components.linkFavorite.attr("src", _movie.isFavorite ? "/images/favorite.png" : "/images/favoritegray.png").tooltip("hide");
			handler(_movie);
		});
	};

	//	Sets the event handler for selecting a movie.
	this.onMovieSelected = function(handler) { _components.panel.find(".selectable").click(function() { handler(_movie); }); };

	//	Sets the event handler for selecting a movie genre.
	this.onGenreSelected = function(handler) { _components.linkGenres.click(function() { handler($(this).text()); }); };

	//	Returns the wrapped movie.
	this.getMovie = function() { return _movie; };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//  The default constructor.
	//  panel:                      	The panel containing the control elements.
	//  movie:			The wrapped movie.
	//
	this.initialize = function(parameters) {
		_movie = parameters.movie;

		loadComponents(parameters.panel);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Updates the movie panel.
	//	movie:			The new movie.
	//
	this.update = function(movie) {
		_movie = movie;
		_components.linkFavorite.attr("src", _movie.isFavorite ? "/images/favorite.png" : "/images/favoritegray.png").tooltip("hide");
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
		_components.linkGenres = panel.find(">div>div>div>a");
	};

	this.initialize(parameters);
};//