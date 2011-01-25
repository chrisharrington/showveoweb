Showveo.Validator.validateNamespace("Showveo.Controls.AddMovie");

//
//	A control used to allow the user to specify information for an uncategorized movie.
//
Showveo.Controls.AddMovie.AddMovie = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components.
	var _components;

	//	The page size.
	var _pageSize;

	//	The list of search results.
	var _results;

	//	The current page.
	var _page;

	//	The uncategorized movie.
	var _uncategorizedMovie;

	//	The event handler to fire when the user requests a search.
	var _onSearch;

	//	The event handler to fire when the user has selected an uncategorized movie's information.
	var _onUncategorizedMovieSelected;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the handler for searching for movies.
	this.onSearch = function(handler) { _onSearch = handler; };

	//	Sets the handler for selecting an uncategorized movie's information.
	this.onUncategorizedMovieSelected = function(handler) { _onUncategorizedMovieSelected = handler; };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:				The panel containing the control elements.
	//
	this.initialize = function(parameters) {
		_pageSize = 5;
		_results = new Array();
		_page = 1;

		loadComponents(parameters.panel);	
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the control with the given movie.
	//	movie:				The uncategorized movie.
	//
	this.loadMovie = function(movie) {
		_uncategorizedMovie = movie;

		_components.labelName.text(movie.name);
		_components.panel.modal("show");
		_components.textTitle.focus();
	};

	//
	//	Loads a list of search results.
	//	movies:				The list of search results.
	//
	this.loadSearchResults = function(movies) {
		_results = movies;

		var panel = _components.buttonSelect.parent().parent();
		if (movies.length > 0)
			panel.fadeIn(200);
		else
			panel.fadeOut(200);

		_page = 1;
		loadResults(_page);
	};

	//
	//	Indicates that an error has occurred.
	//	error:				The error message.
	//
	this.error = function(error) {
		_components.labelFeedback.css("color", "Red").text(error);	
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user has clicked on ths search button.  Searches for movies matching the given title.
	//
	var buttonSearchClicked = function() {
		var title = _components.textTitle.val();
		if (title == "") {
			_components.labelFeedback.css("color", "Red").text("You must enter a title to search for!");
			return;
		}

		_components.labelFeedback.text("");

		_onSearch(_components.textTitle.val());

		_components.panelResultButtons.show();
	};

	//
	//	Fired after the user has cancelled an add movie operation.  Hides and resets the control.
	//
	var buttonCancelClicked = function() {
		_components.panel.modal("hide");
		_components.textTitle.val("");
		_components.labelFeedback.text("");
		_components.panelResults.hide();
		_components.panelResultButtons.hide();
	};

	//
	//	Fired after the user has selected a movie.  Hides the control and selects a movie.
	//
	var buttonSelectClicked = function() {
		buttonCancelClicked();
		_onUncategorizedMovieSelected(_uncategorizedMovie, getMovieByID(_components.panelResults.find(".selected").attr("name")));
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common components.
	//	panel:				The panel containing the control elements.
	//
	var loadComponents = function(panel) {
		_components = {};
		_components.panel = panel.modal();
		_components.labelName = panel.find(">span");
		_components.textTitle = panel.find(">div.search>input[type='text']").enter(buttonSearchClicked);
		_components.buttonSearch = panel.find(">div.searchbuttons>div>button:first").click(buttonSearchClicked);
		_components.buttonCancel = panel.find(">div.searchbuttons>div>button:last").click(buttonCancelClicked);
		_components.labelFeedback = panel.find(">div.buttons>span");
		_components.panelResults = panel.find(">div.results");
		_components.buttonSelect = panel.find(">div.resultbuttons>div>button").click(buttonSelectClicked);
		_components.linkPrevious = panel.find(">div.results>div.more>a:last").click(function() { loadResults(--_page); });
		_components.linkNext = panel.find(">div.results>div.more>a:first").click(function() { loadResults(++_page); });
		_components.panelResultButtons = panel.find(">div.resultbuttons");
	};

	//
	//	Loads the results for the given page.
	//	page:				The page number.
	//
	var loadResults = function(page) {
		_components.buttonSelect.attr("disabled", true);

		_components.panelResults.fadeOut(200, function() {
			_components.linkPrevious.show();
			_components.linkNext.show();

			if (page == 1)
				_components.linkPrevious.hide();
			if (page == (_results.length/_pageSize))
				_components.linkNext.hide();

			_components.panelResults.find(">div:not(.more)").remove();
			for (var i = (page-1)*_pageSize; i < page*_pageSize; i++) {
				var movie = _results[i];
				var panel = $("<div></div>").addClass("selectable rounded").attr("name", movie.id).click(function() {
					var add = !$(this).hasClass("selected");
					_components.panelResults.find("div.selected").removeClass("selected");
					if (add)
						$(this).addClass("selected");
					_components.buttonSelect.attr("disabled", !add);
				});
				panel.append($("<span></span>").text(movie.name));
				panel.insertBefore(_components.panelResults.find("div.more"));
			}

			_components.panelResults.fadeIn(200);
		});
	};

	//
	//	Iterates through the list of movie results looking for the movie with the given ID.
	//	id:					The movie ID.
	//	Returns:				The found movie or nothing.
	//
	var getMovieByID = function(id) {
		var movie;
		$(_results).each(function(index, curr) {
			if (curr.id == id) {
				movie = curr;
				return true;
			}
		});
		return movie;
	};

	this.initialize(parameters);
};