Showveo.Validator.validateNamespace("Showveo.Controls.AddMovie");

//
//	A control used to provide movie search results.
//
Showveo.Controls.AddMovie.MovieSearchResults = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The event handlers.
	var _handlers;

	//	The common components for the control.
	var _components;

	//	The maximum number of movies to display.
	var _count;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:							The panel containing the control elements.
	//	handlers:						The event handlers.
	//
	this.initialize = function(parameters) {
		_count = 0;
		_page = 1;
		_size = 5;
		_handlers = parameters.handlers;

		loadComponents(parameters.panel);
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

		if (_handlers["searchResultsLoaded"])
			_handlers["searchResultsLoaded"](_components.textMovieSearchName.val());

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
		_components.textMovieSearchName = panel.find("div.input>input[type='text']");
		_components.labelSearchResults = panel.find("div.searchresults>div.count>span");

		_components.buttonSearch = panel.find("div.input>input[type='button']").click(function() {
			_components.panel.find("input").attr("disabled", true);
			_this.clear();
			if (_handlers["search"])
				_handlers["search"](_components.textMovieSearchName.val(), (_page-1)*_size, _size);
		});

		_components.linkMore = panel.find("div.searchresults>div.count>a").click(function() {
			if (_handlers["search"])
				_handlers["search"](_components.textMovieSearchName.val(), (++_page-1)*_size, _size);
		});
	}

	//
	//	Creates a panel to wrap a movie.
	//	movie:							The movie.
	//	Returns:						The created panel.
	//
	var createMoviePanel = function(movie) {
		var panel = $("<div></div>").addClass("rounded pointer").attr("name", movie.ID).hide();
		panel.append($("<i></i>").text(movie.Name + (movie.Year == "" ? "" : " (" + movie.Year + ")")));
		panel.append($("<b></b>"));
		return panel;
	}

	//
	//	Derives a comma separated cast member string.
	//	movie:							The movie containing the cast members.
	//	Returns:						The cast member string.
	//
	var deriveCastString = function (movie) {
		var string = "";
		for (var i = 0; i < movie.Cast.length; i++)
			string += ", " + movie.Cast[i].Name;
		return string.substring(2);
	}

	//
	//	Adds the given list of movies to the search results.
	//	movies:							The movies to add.
	//
	var addMovies = function (movies) {
		$(movies).each(function(index, movie) {
			createMoviePanel(movie).insertBefore(_components.panelSearchResults.find(">div.count")).slideDown(250);
		});
	}

	this.initialize(parameters);
};
