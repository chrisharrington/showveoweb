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
			url: _service + "/recent.data",
			dataType: "json",
			global: false,
			success: function(infos) {
				_this.notify("recentlyUploadedMovies", combine(infos));
			},
			error: function(error) {
				_this.notify("error", "An error has occurred while retrieving your recenly uploaded movies list.  Please try again later!");
			}
		});
	};

	//
	//	Retrieves the list of favorite movies.
	//
	this.getFavoriteMovies = function() {
		$.ajax({
			url: _service + "/favorites.data",
			dataType: "json",
			global: false,
			success: function(infos) {
				_this.notify("favoriteMovies", combine(infos));
			},
			error: function(error) {
				_this.notify("error", "An error has occurred while retrieving your favorite movies list.  Please try again later!");
			}
		});
	};

	//
	//	Retrieves a list of movies by genre.
	//	genre:					The genre.
	//
	this.getMoviesByGenre = function(genre) {
		$.ajax({
			url: _service + "/genre/" + genre.replace(/ /g, "_") + ".data",
			dataType: "json",
			type: "GET",
			global: false,
			success: function(infos) {
				_this.notify("moviesByGenre", combine(infos));
			},
			error: function() {
				_this.notify("error", "An error has occurred while retrieving your movies by genre.  Please try again later!");
			}
		});
	};

	//
	//	Retrieves the list of all movies.
	//
	this.getAllMovies = function() {
		$.ajax({
			url: _service + "/all.data",
			dataType: "json",
			global: false,
			success: function(infos) {
				_this.notify("allMovies", combine(infos));
			},
			error: function(error) {
				_this.notify("error", "An error has occurred while retrieving your movies list.  Please try again later!");
			}
		});
	};

	//
	//	Retrieves the list of uncategorized movies.
	//
	this.getUncategorizedMovies = function() {
		$.ajax({
			url: _service + "/uncategorized.data",
			dataType: "json",
			global: false,
			success: function(movies) {
				_this.notify("uncategorizedMovies", movies);
			},
			error: function(error) {
				_this.notify("error", "An error has occurred while retrieving the uncategorized movies list.  Please try again later.");
			}
		});
	};

	//
	//	Retrieves a list of remote movies that match the given query.
	//	query:					The search query.
	//
	this.movieSearch = function(query) {
		$.ajax({
			url: _service + "/search/" + (query.replace(/ /g, "+")) + ".data",
			dataType: "json",
			global: false,
			success: function(movies) {
				_this.notify("searchResults", movies);
			},
			error: function() {
				_this.notify("searchError", "An error has occurred while retrieving the search results.");
			}
		});
	};

	//
	//	Retrieves a list of all genres.
	//
	this.getAllGenres = function() {
		$.ajax({
			url: _service + "/genres.data",
			dataType: "json",
			global: false,
			success: function(genres) {
				_this.notify("genres", genres);
			},
			error: function() {
				_this.notify("error", "An error has occurred while retrieving the genres list.  Please try again later.");
			}
		});
	};

	//
	//	Changes the favorite status of a movie.
	//	movie:					The movie whose favorite status is changing.
	//
	this.setMovieFavorite = function(movie) {
		$.ajax({
			url: _service + (movie.isFavorite ? "/favorite" : "/unfavorite") + "/" + movie.id + ".data",
			type: "PUT",
			dataType: "json",
			global: false,
			success: function() { _this.notify("favoriteChanged", movie); },
			error: function(error) { _this.notify("error", "An error has occurred while changing the favorite status of your movie.  Please try again later!"); }
		});
	};

	//
	//	Categorizes a movie.
	//	uncategorized:				The uncategorized movie.
	//	info:						The selected movie information.
	//	callback:					The controller callback.
	//
	this.categorize = function(uncategorized, info, callback) {
		$.ajax({
			url: _service + "/categorize.data",
			data: { "uncategorizedMovieID": uncategorized.id, "infoID": info.id },
			type: "PUT",
			dataType: "json",
			global: false,
			success: function() {
				callback();
				_this.notify("movieCategorized", uncategorized);
			},
			error: function(error) { _this.notify("error", "An error has occurred while categorizing your movie.  Please try again later!"); }
		});
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Derives a combined movie object from a user-movie relationship.
	//	info:						The user-movie information object.
	//	Returns:					The combined object.
	//
	var combine = function(infos) {
		var movies = new Array();
		infos.forEach(function(info) {
			var movie = info.movie;
			movie.isFavorite = info.isFavorite;			
			movies.push(movie);
		});
		return movies;
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.ManageMoviesModel.prototype = new Showveo.Models.Base;
});
