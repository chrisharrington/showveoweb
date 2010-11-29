Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the manage movies page.
//
Showveo.Models.ManageMoviesModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The service location.
	var _service;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	service:				The service location.
	//
	this.initialize = function(parameters) {
		_service = parameters.service;
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Retrieves the list of recently uploaded movies.
	//
	this.getRecentlyUploadedMovies = function() {
		$.ajax({
			url: _service + "/recent",
			dataType: "json",
			global: false,
			success: function(movies) {
				_this.notify("recentlyUploadedMovies", movies);
			},
			error: function(error) {
				_this.notify("error", "An error has occurred while retrieving your recenly uploaded movies list.  Please try again later!");
			},			
			fixture: "/fixtures/recentMovies.json"
		});
	};

	//
	//	Retrieves the list of favorite movies.
	//
	this.getFavoriteMovies = function() {
		$.ajax({
			url: _service + "/favorites",
			dataType: "json",
			global: false,
			success: function(movies) {
				_this.notify("favoriteMovies", movies);
			},
			error: function(error) {
				_this.notify("error", "An error has occurred while retrieving your favorite movies list.  Please try again later!");
			},
			fixture: "/fixtures/favoriteMovies.json"
		});
	};

	//
	//	Retrieves a list of movies by genre.
	//	genre:					The genre.
	//
	this.getMoviesByGenre = function(genre) {
		$.ajax({
			url: _service + "/genre/" + genre,
			dataType: "json",
			type: "GET",
			global: false,
			success: function(movies) {
				_this.notify("moviesByGenre", movies);
			},
			error: function() {
				_this.notify("error", "An error has occurred while retrieving your movies by genre.  Please try again later!");
			},
			fixture: "/fixtures/genreMovies.json"
		});
	};

	//
	//	Retrieves the list of all movies.
	//
	this.getAllMovies = function() {
		$.ajax({
			url: _service + "/all",
			dataType: "json",
			global: false,
			success: function(movies) {
				_this.notify("allMovies", movies);
			},
			error: function(error) {
				_this.notify("error", "An error has occurred while retrieving your movies list.  Please try again later!");
			},
			fixture: "/fixtures/allMovies.json"
		});
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.ManageMoviesModel.prototype = new Showveo.Models.Base;
});
