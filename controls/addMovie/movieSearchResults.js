Showveo.Validator.validateNamespace("Showveo.Controls.AddMovie");

//
//	A control used to provide movie search results.
//
Showveo.Controls.AddMovie.MovieSearchResults = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The common components for the control.
	var _components;

	//	The maximum number of movies to display.
	var _count;

	//	The event handler to execute on a search.
	var _onSearch;

	//	The event handler to execute on a movie selection.
	var _onMovieSelected;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:							The panel containing the control elements.
	//	onSearch:						The event handler to execute on a search.
	//	onMovieSelected:				The event handler to execute on a movie selection.
	//
	this.initialize = function(parameters) {
		_count = 0;
		_page = 1;
		_size = 5;
		_onSearch = parameters.onSearch;
		_onMovieSelected = parameters.onMovieSelected;

		loadComponents(parameters.panel);
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the header submits a search.
	//
	var search = function() {
		_components.linkMore.fadeOut(250);
		_this.clear();

		_onSearch(_components.textMovieSearchName.val(), (_page-1)*_size, _size);
	}

	//
	//	Fired after a movie has been selected.
	//
	var movieSelected = function() {
		Showveo.Controls.AddMovie.MoviePanelCreator.hideDetails();

		_onMovieSelected(Showveo.Controls.AddMovie.MoviePanelCreator.getMovie());
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the given list of movies into the control.
	//	movies:							The list of movies.
	//
	this.load = function(movies) {
		addMovies(movies);
		_components.linkMore.show();

		var count = _components.panelSearchResults.find(">div:not(div.count)").length;
		if (count >= _count)
			_components.linkMore.fadeOut(250);

		_components.panel.find("input").attr("disabled", false);
	}

	//
	//	Clears the search results.
	//
	this.clear = function() {
		_count = 0;
		_page = 1;
		_components.panelSearchResults.find(">div:not(div.count)").slideUp(250, function() {
			$(this).remove();
		});
	}

	//
	//	Updates the count for the total search results.
	//	count:							The count.
	//
	this.count = function(count) {
		_count = count;
	}

	//
	//	Updates the movie panel.
	//	movie:							The movie whose panel needs to be updated.
	//
	this.update = function(movie) {
		_components.panelSearchResults.find(">div[name='" + movie.ID + "']").find("b").hide().text(deriveCastString(movie)).fadeIn(250);
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common components.
	//	panel:							The panel containing the control elements.
	//
	var loadComponents = function(panel) {
		_components = {};
		_components.panel = panel;
		_components.panelSearchResults = panel.find("div.searchresults");
		_components.labelSearchResults = panel.find("div.searchresults>div.count>span");

		_components.textMovieSearchName = panel.find("div.input>input[type='text']").enter(search).clearbox();
		_components.buttonSearch = panel.find("div.input>input[type='button']").click(search);
		_components.panelDetails = panel.find("div.moviedetails").modal();
		_components.buttonCloseDetails = panel.find("div.moviedetails input[type='button']:last").click(function () { _components.panelDetails.modal("hide"); });
		_components.buttonSelectMovie = panel.find("div.moviedetails input[type='button']:first").click(movieSelected);

		_components.linkMore = panel.find("div.searchresults>div.count>a").click(function() {
			if (_onSearch)
				_onSearch(_components.textMovieSearchName.val(), (++_page-1)*_size, _size);
		});
	}

	//
	//	Derives a comma separated cast member string.
	//	movie:							The movie containing the cast members.
	//	Returns:						The cast member string.
	//
	var deriveCastString = function (movie) {
		var string = "";
		for (var i = 0; i < movie.Actors.length; i++)
			string += ", " + movie.Actors[i].Name;
		return string.substring(2);
	}

	//
	//	Adds the given list of movies to the search results.
	//	movies:							The movies to add.
	//
	var addMovies = function (movies) {
		$(movies).each(function(index, movie) {
			Showveo.Controls.AddMovie.MoviePanelCreator.create({ panel: _components.panelSearchResults, movie: movie, details: _components.panelDetails });
		});
	}

	this.initialize(parameters);
};
