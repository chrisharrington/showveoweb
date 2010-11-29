Showveo.Validator.validateNamespace("Showveo.Controllers");

//
//	The controller for the movie details page.
//
Showveo.Controllers.MovieDetailsController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The view.
	var _view;

	//	The model.
	var _model;

	//	The event handler to execute when the user has selected a genre.
	var _onGenreSelected;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:				The view.
	//	model:				The model.
	//	onGenreSelected:	The event handler to execute when the user has selected a genre.
	//
	this.initialize = function(parameters) {
		_view = parameters.view;
		_model = parameters.model;
		_onGenreSelected = parameters.onGenreSelected;

		loadHandlers();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Called after the controller has loaded.
	//	state:				The state of the application.
	//
	this.loaded = function(state) {
		var title = state.substring(0, state.lastIndexOf("_")).replace(/_/g, " ");
		var year = state.substring(state.lastIndexOf("_")+1);

		_model.getMovieDetails(title, year);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user has indicated a favorite status change for a movie.
	//	movie:				The movie whose favorite status is changing.
	//	favorite:			A flag indicating if the movie is a favorite or not.
	//
	var onFavoriteChanged = function(movie, favorite) {
		_view.favoriteChanged(favorite);
		_model.setMovieFavorite(movie, favorite);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common handlers for the controller.
	//
	var loadHandlers = function() {
		_view.onGenreSelected(_onGenreSelected);
		_view.onFavoriteChanged(onFavoriteChanged);
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.MovieDetailsController.prototype = new Showveo.Controllers.Base;
});
