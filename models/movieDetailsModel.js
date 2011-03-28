Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the movie details page.
//
Showveo.Models.MovieDetailsModel = function(parameters) {

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
	//	Retrieves movie details.
	//	title:					The movie title.
	//	year:					The movie year.
	//
	this.getMovieDetails = function(title, year) {
		$.ajax({
			url: _service + "/" + (title.replace(/ /g, "_") + "_" + year) + ".data",
			type: "GET",
			dataType: "json",
			success: function(movie) {
				_this.notify("movieDetails", movie);
			}/*,
			fixture: "/fixtures/movie.json"*/
		})
	};

	//
	//	Changes the favorite status of a movie.
	//	movie:					The movie whose favorite status is changing.
	//	favorite:				The flag indicating whether or not the movie should be a favorite.
	//
	this.setMovieFavorite = function(movie, favorite) {
		$.ajax({
			url: _service + (favorite ? "/favorite" : "/unfavorite") + "/" + movie.id,
			type: "PUT",
			dataType: "json",
			error: function() {
				_this.notify("favoriteChanged", !favorite);	
			},
			fixture: function() {}
		});
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.MovieDetailsModel.prototype = new Showveo.Models.Base;
});
