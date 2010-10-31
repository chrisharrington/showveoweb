Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The view for the add movie section.
//
Showveo.Views.AddMovieView = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The event handlers container.
	var _handlers;

	//	The common components.
	var _components;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the handler for the upload file event.
	this.onUpload = function(handler) { _handlers["upload"] = handler; }

	//	Sets the handler for the movie search event.
	this.onSearch = function(handler) { _handlers["search"] = handler; }

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//
	this.initialize = function(parameters) {
		_handlers = {};
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the components for the controller.
	//	view:							The add movie view.
	//
	this.loadComponents = function(view) {
		_components = {};
		_components.view = view

		_components.searchResults = new Showveo.Controls.AddMovie.MovieSearchResults({
			panel: view.find("div.chooseinfo"),
			handlers: _handlers
		});

		/*_components.upload = new Showveo.Controls.YUIUploader({
			panel: _components.view.find("div.choosefile"),
			feedback: _feedback,
			fileSelected: fileSelected
		});*/
	}

	//
	//	Sets the result of a search.
	//
	this.searchResults = function() {
		var movies = _this.model.getResults("searchResults"); 
		if (movies.length == 0) {
			_this.error("No movies were found.");
			return;
		}

		_components.searchResults.load(movies);
	}

	//
	//	Sets the search results count.
	//
	this.searchResultsCount = function() {
		_components.searchResults.count(_this.model.getResults("searchResultsCount"));
	}

	//
	//	Updates the created movie panels with more information.
	//
	this.detailedInfo = function() {
		_components.searchResults.update(_this.model.getResults("detailedInfo"));
	}

	this.base_initialize(parameters, this);
	this.initialize(parameters);
}

Showveo.Views.AddMovieView.prototype = new Showveo.Views.Base;
