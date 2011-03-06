Showveo.Validator.validateNamespace("Showveo.Views.Movie.Manage");

//
//  A control used to manage a grouping of movie display tabs.
//
Showveo.Views.Movie.Manage.MovieTabs = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the control.
	var _components;

	//	The collection of movies to display in the tabs.
	var _movies;

	//	Creates movie panels.
	var _moviePanelFactory;

	//	The add movie control.
	var _addMovie;

	//	The status of the control.
	var _status;

	//	The event handler that's fired when the user requests that the movie be deleted.
	var _onMovieDeleted;

	//	The event handler that's fired when the user requests that the movie be placed in or removed from his or her favorites.
	var _onMovieFavoriteChanged;

	//	The event handler that's fired when the user selects a movie.
	var _onMovieSelected;

	//	The event handler that's fired when the user clicks one of the movie's genre links.
	var _onGenreSelected;

	//	The event handler that's fired when the user selects a movie tab.
	var _onTabSelected;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the event handler for deleting a movie.
	this.onMovieDeleted = function(handler) { _onMovieDeleted = handler; };

	//	Sets the event handler for favoriting or unfavoriting a movie.
	this.onMovieFavoriteChanged = function(handler) { _onMovieFavoriteChanged = handler; };

	//	Sets the event handler for selecting a movie.
	this.onMovieSelected = function(handler) { _onMovieSelected = handler; };

	//	Sets the event handler for selecting a movie genre.
	this.onGenreSelected = function(handler) { _onGenreSelected = handler; };

	//	Sets the event handler for selecting a movie tab.
	this.onTabSelected = function(handler) { _onTabSelected = handler; };

	//	Sets the handler for when the user has changed genres in the genres tab.
	this.onGenreChanged = function(handler) { _components.selectGenres.change(function() { handler($(this).find("option:selected").text()); }); };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	tabs:						The tab parameters.
	//	panel:					The panel containing the control elements.
	//	factory:					Creates movie panels.
	//	uncategorized:				The uncategorized movies panel.
	//	addMovie:				The add movie control.
	//	onMovieDeleted:			The event handler for deleting a movie.
	//	onMovieFavoriteChanged:	The event handler for favoriting or unfavoriting a movie.
	//
	this.initialize = function(parameters) {
		_moviePanelFactory = parameters.factory;
		_addMovie = parameters.addMovie;
		_onMovieDeleted = parameters.onMovieDeleted;
		_onMovieFavoriteChanged = parameters.onMovieFavoriteChanged;
		_movies = new Array();
		_status = {};

		loadComponents(parameters.panel);
		loadEmptyStatus(parameters.tabs);

		createSelection(parameters.tabs);
		createLoading();
		createTabs(parameters.tabs);
		createGenres(parameters.panel.find("div.tab[name='genres']>div"));

		loadUncategorized(parameters.uncategorized);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Sets the movies for a particular tab.
	//	name:					The name of the tab.
	//	movies:					The collection of movies.
	//
	this.setMoviesForTab = function(name, movies) {
		_status[name] = true;
		populateTab(name, movies);

		checkStatus(function() {
			selectTab(_components.panelSelection.find("span.selected").attr("name"));
			addHandlers();
		});
	};

	//
	//	Sets the list of uncategorized movies.
	//	movies:					The collection of uncategorized movies.
	//
	this.setUncategorizedMovies = function(movies) {
		populateUncategorizedMoviesTab(movies);
	};

	//
	//	Selects the tab with the given name.
	//	name:					The name of the tab to select.
	//
	this.selectTab = function(name) {
		selectTab(name);
	};

	//
	//	Updates the movie in all tabs.
	//	movie:					The movie to update.
	//
	this.updateMovie = function(movie) {
		updateMovie(movie);
	};

	//
	//	Sets the genres for the genres tab.
	//	genres:					The genres.
	//
	this.setGenres = function(genres) {
		$(genres).each(function(index, genre) {
			_components.selectGenres.append($("<option></option>").val(genre.id).text(genre.name));	
		});
	};

	//
	//	Removes the given uncategorized movie from the uncategorized movie list.
	//	movie:					The movie to remove.
	//
	this.removeUncategorizedMovie = function(movie) {
		var panel = _components.panel.find("div.uncategorized");
		panel.find("div[name='" + movie.id + "']").remove();

		var count = parseInt(panel.find(">div>span b").text(), 10);
		updateUncategorizedCount(panel.find(">div>span"), count-1);
	};

	//
	//	Resets each of the tabs by clearing its list of movies.
	//
	this.reset = function() {
		_movies = new Array();
		_components.panel.find(">div.tab:not(div.uncategorized) div.movie").remove();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handers */

	//
	//  Fired after the user has selected a tab.  Marks that tab selected and show its contents while hiding all others.
	//
	var tabSelected = function() {
		if ($(this).hasClass("selected"))
			return;
		selectTab($(this).attr("name"));
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//  Loads the common components for the control.
	//
	var loadComponents = function(panel) {
		_components = {};
		_components.panel = panel;
	};

	//
	//	Loads the uncategorized panel into a tab.
	//	panel:					The uncategorized movies panel.
	//
	var loadUncategorized = function (panel) {
		var tab = _components.panel.find("div.tab[name='uncategorized']");
		tab.addClass("uncategorized").find(">div").remove();
		tab.append(panel.find(">*"));
	};

	//
	//	Creates the selection panel.
	//	tabs:					The tab parameters.
	//
	var createSelection = function(tabs) {
		var selection = _components.panelSelection = $("<div></div>").addClass("selection");
		$(tabs).each(function(index, tab) {
			var label = $("<span></span>").text(tab.title).attr("name", tab.name).click(tabSelected);
			if (index == 0)
				label.addClass("selected");
			selection.append(label);
		});
		_components.panel.append(selection);
	};

	//
	//	Creates the loading panel.
	//
	var createLoading = function () {
		var container = _components.panelLoading = $("<div></div>").addClass("loading tab rounded");
		var panel = $("<div></div>");
		panel.append($("<img />").attr("src", "/images/loading.gif").attr("alt", ""));
		panel.append($("<span></span>").text("Your movies are being loaded..."));
		container.append(panel);
		_components.panel.append(_components.panelLoading);
	};

	//
	//	Creates the tabs for movies.
	//	tabs:					The tab parameters.
	//
	var createTabs = function (tabs) {
		$(tabs).each(function(index, tab) {
			_components.panel.append($("<div></div>").addClass("tab rounded").attr("name", tab.name).hide().append($("<div></div>").addClass("rounded")));
		});
	};

	//
	//	Creates the additional controls required for the genres tab.
	//	tab:					The genres tab.
	//
	var createGenres = function (tab) {
		var panel = $("<div></div>").addClass("genres");
		panel.append($("<span></span>").text("Genre:"));
		panel.append(_components.selectGenres = $("<select></select>"));
		tab.append(panel);
	};
	
	//
	//  Populates a tab with a list of movies.
	//	name::					The name of the tab to populate.
	//	movies:					The list of movies to insert into the tab.
	//
	var populateTab = function(name, movies) {
		var tab = _components.panel.find("[name='" + name + "']>div");
		tab.find(">div.movie").remove();

		$(movies).each(function(index, movie) {
			var panel = _moviePanelFactory.create(movie);
			_movies.push(new Showveo.Views.Movie.Manage.Movie({
				panel: panel,
				movie: movie
			}));
			tab.append(panel);
		});
	};

	//
	//	Populates the uncategorized movies tab.
	//	movies:					The collection of uncategorized movies.
	//
	var populateUncategorizedMoviesTab = function(movies) {
		var tab = _components.panel.find("[name='uncategorized']>div");

		updateUncategorizedCount(tab.find(">span"), movies.length);

		$(movies).each(function(index, movie) {
			var panel = _moviePanelFactory.createUncategorized(movie);
			panel.click(function() { _addMovie.loadMovie(movie); });
			tab.append(panel);
		});
	};

	//
	//	Selects the tab with the given name.
	//	name:					The name of the tab to select.
	//
	var selectTab = function(name) {
		deselectAll(function() {
			_onTabSelected(name);
			_components.panelSelection.find("span[name='" + name + "']").addClass("selected");
			_components.panel.find("div.tab[name='" + name + "']").fadeIn(0).addClass("selected");
		});
	};

	//
	//	Deselects and hides all tabs.
	//	callback:				The function to exceute once all tabs have been hidden.
	//
	var deselectAll = function(callback) {
		var panel = _components.panel.find("div.loading").is(":visible") ? _components.panel.find("div.loading") : _components.panel.find("div.tab.selected");
		panel.removeClass("selected").fadeOut(0, function() {
			_components.panelSelection.find("span.selected").removeClass("selected");
			callback();
		});
	};

	//
	//	Loads the status of the control.
	//	tabs:					The tab parameters.
	//
	var loadEmptyStatus = function (tabs) {
		$(tabs).each(function(index, tab) {
			_status[tab.name] = false;
		});
		_status["uncategorized"] = true;
	};

	//
	//	Checks to see if the control has been completely loaded.
	//	callback:				The callback function to execute if the control has been loaded.
	//
	var checkStatus = function (callback) {
		var done = true;
		for (var name in _status) {
			if (!_status[name]) {
				done = false;
				break;
			}
		}

		if (done)
			callback();
	};

	//
	//	Adds the event handlers for all of the loaded movies.
	//
	var addHandlers = function () {
		$(_movies).each(function(index, movie) {
			addHandlersToMovie(movie);
		});
	};

	//
	//	Adds event handlers for a movie.
	//	movie:				The movie.
	//
	var addHandlersToMovie = function(movie) {
		movie.onMovieDeleted(_onMovieDeleted);
		movie.onMovieFavoriteChanged(_onMovieFavoriteChanged);
		movie.onMovieSelected(_onMovieSelected);
		movie.onGenreSelected(_onGenreSelected);
	};

	//
	//	Updates a movie panel.
	//	movie:				The movie to update.
	//
	var updateMovie = function(movie) {
		var addedFavorite = false;
		$(_movies).each(function(index, curr) {
			if (curr.getMovie().id != movie.id)
				return true;

			if (!addedFavorite && movie.isFavorite && !curr.getMovie().isFavorite) {
				addedFavorite = true;

				var panel = _moviePanelFactory.create(movie);
				var created = new Showveo.Views.Movie.Manage.Movie({
					panel: panel,
					movie: movie
				});

				addHandlersToMovie(created);
				_movies.push(created);
				_components.panel.find("div.tab[name='favorites']>div").append(panel);
			}

			curr.update(movie);
		});
	};

	//
	//	Updates the descriptive text for the uncategorized movies tab.
	//	label:				The label containing the text.
	//	count:				The new movie count.
	//
	var updateUncategorizedCount = function (label, count) {
		if (count == 0)
			label.text("There are currently no uncategorized movies.");
		else if (count == 1)
			label.html("There is currently <b>1</b> movie that is uncategorized.  To assign information to this movie, click on it below.");
		else
			label.html("There are currently <b>" + count + "</b> movies that are uncategorized.  To assign information to these movies, click on each of them below.");
	};

	this.initialize(parameters);
};
