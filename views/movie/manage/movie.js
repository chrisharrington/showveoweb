
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

	//	The event handler that's fired when the user requests that the movie be placed in his or her favorites.
	var _onMovieFavorited;

	//	The event handler that's fired when the user clicks one of the movie's genre links.
	var _onGenreSelected;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the event handler for deleting a movie.
	this.onMovieDeleted = function(handler) { _components.linkDelete.click(function() { handler(_movie); }); };

	//	Sets the event handler for favoriting a movie.
	this.onMovieFavorited = function(handler) { _components.linkFavorite.click(function() { handler(_movie); }); };

	//	Sets the event handler for selecting a movie genre.
	this.onGenreSelected = function(handler) { _components.linkGenres.click(function() { handler($(this).text()); }); };
	
	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//  The default constructor.
	//  panel:                      The panel containing the control elements.
	//  movie:                      The wrapped movie.
	//	onMovieDeleted:	The event handler for deleting a movie.
	//	onMovieFavorited:	The event handler for favoriting a movie.
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
		_components.linkGenres = panel.find(">div>div>div>a");
	};

	this.initialize(parameters);
};//