Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The view for the movie details page.
//
Showveo.Views.MovieDetailsView = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The common components for the view.
	var _components;

	//	The event handlers.
	var _handlers;

	//	The wrapped movie.
	var _movie;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the event handler for selecting a genre.
	this.onGenreSelected = function(handler) { _handlers["onGenreSelected"] = handler; };

	//	Sets the event handler for marking a movie as a favorite.
	this.onFavoriteChanged = function(handler) { _handlers["onFavoriteChanged"] = handler; };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//
	this.initialize = function(parameters) {
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
		_components.labelTitle = view.find(">div.moviedetails>div.title>span.header");
		_components.labelOwner = view.find(">div.moviedetails>i");
		_components.labelDirector = view.find(">div.moviedetails>div.cast:first>span");
		_components.labelActors = view.find(">div.moviedetails>div.cast:last>span");
		_components.labelSynopsis = view.find(">div.moviedetails>div.synopsis");
		_components.panelGenres = view.find(">div.moviedetails>div.genres");
		_components.imgFavorite = view.find(">div.moviedetails>div.title>img").click(function() { _handlers["onFavoriteChanged"](_movie, !_movie.isFavorite); });
		_components.videoMovie = view.find(">div.moviedetails>div.display>video");
	};

	//
	//	Sets the movie details.
	//	movie:					The movie.
	//
	this.movieDetails = function(movie) {
		_movie = movie;

		_components.labelTitle.text(movie.name);
		_components.labelOwner.html("Uploaded by <b>" + movie.owner.firstName + " " + movie.owner.lastName + "</b> " + movie.uploadDate.parseShortDate().differenceString() + ".");
		_components.labelDirector.text(movie.director);
		_components.labelActors.text(movie.actors.toCommaString());
		_components.labelSynopsis.text(movie.synopsis);
		_components.imgFavorite.attr("src", movie.isFavorite ? "/images/favorite.png" : "/images/favoritegray.png");
		_components.videoMovie.attr("src", movie.url);

		createGenres(movie.genres);

		_this.favoriteChanged(movie.isFavorite);
	};

	//
	//	Updates the movie favorite status.
	//	favorite:				The new favorite status for the movie.
	//
	this.favoriteChanged = function(favorite) {
		_movie.isFavorite = favorite;
		var title = favorite ? "Remove this movie from your favorite movies." : "Add this movie to your list of favorites.";
		_components.imgFavorite.attr("src", favorite ? "/images/favorite.png" : "/images/favoritegray.png").attr("title", title).tooltip("right").tooltip("hide").fadeIn(200);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Creates genre tags to append to the genres panel.
	//	genres:					The collection of genres.
	//
	var createGenres = function (genres) {
		_components.panelGenres.empty();
		$(genres).each(function(index, genre) {
			_components.panelGenres.append($("<a></a>").text(genre).addClass("tag").click(function() { _handlers["onGenreSelected"](genre); }));;
		});
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Views.MovieDetailsView.prototype = new Showveo.Views.Base;
});


