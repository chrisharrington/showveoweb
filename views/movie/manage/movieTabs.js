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

	//	The status of the control.
	var _status;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	tabs:				The tab parameters.
	//	panel:			The panel containing the control elements.
	//	factory:			Creates movie panels.
	//
	this.initialize = function(parameters) {
		_moviePanelFactory = parameters.factory;
		_movies = {};
		_status = {};

		loadComponents(parameters.panel);
		loadEmptyStatus(parameters.tabs);

		createSelection(parameters.tabs);
		createLoading();
		createTabs(parameters.tabs);
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Sets the movies for a particular tab.
	//	name:			The name of the tab.
	//	movies:			The collection of movies.
	//
	this.setMoviesForTab = function(name, movies) {
		_status[name] = true;
		_movies[name] = movies;
		populateTab(name, movies);

		checkStatus();
	};

	//
	//	Selects the tab with the given name.
	//	name:			The name of the tab to select.
	//
	this.selectTab = function(name) {
		selectTab(name);
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
	//	Creates the selection panel.
	//	tabs:				The tab parameters.
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
	//	tabs:				The tab parameters.
	//
	var createTabs = function (tabs) {
		$(tabs).each(function(index, tab) {
			_components.panel.append($("<div></div>").addClass("tab rounded").attr("name", tab.name).hide().append($("<div></div>").addClass("rounded")));
		});
	};

	//
	//  	Populates a tab with a list of movies.
	//	name::			The name of the tab to populate.
	//	movies:			The list of movies to insert into the tab.
	//
	var populateTab = function(name, movies) {
		var tab = _components.panel.find("[name='" + name + "']>div");

		$(movies).each(function(index, movie) {
			var panel = _moviePanelFactory.create(movie);
			new Showveo.Views.Movie.Manage.Movie({ panel: panel, movie: movie });
			tab.append(panel);
		});
	};

	//
	//	Selects the tab with the given name.
	//	name:			The name of the tab to select.
	//
	var selectTab = function(name) {
		deselectAll(function() {
			_components.panelSelection.find("span[name='" + name + "']").addClass("selected");
			_components.panel.find("div.tab[name='" + name + "']").fadeIn(0).addClass("selected");
		});
	};

	//
	//	Deselects and hides all tabs.
	//	callback:			The function to exceute once all tabs have been hidden.
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
	//	tabs:				The tab parameters.
	//
	var loadEmptyStatus = function (tabs) {
		$(tabs).each(function(index, tab) {
			_status[tab.name] = false;
		});
	};

	//
	//	Checks to see if the control has been completely loaded.  Hides the loading tab and shows the preselected tab if that's the case.
	//
	var checkStatus = function () {
		var done = true;
		for (var name in _status) {
			if (!_status[name]) {
				done = false;
				break;
			}
		}

		if (done)
			selectTab(_components.panelSelection.find("span.selected").attr("name"));
	};

	this.initialize(parameters);
};
