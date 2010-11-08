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

	//	The feedback control.
	var _feedback;

	//	The upload service location.
	var _uploadService;

	//	The selected movie ID.
	var _movieID;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Sets the handler for the upload file event.
	this.onUpload = function(handler) { _handlers["upload"] = handler; }

	//	Sets the handler for the movie search event.
	this.onSearch = function(handler) { _handlers["search"] = handler; }

	//	Sets the handler for the movie information selected event.
	this.onMovieSelected = function(handler) { _handlers["movieSelected"] = handler; }

	//	Sets the handler for the movie file selected event.
	this.onMovieFileSelected = function(handler) { _handlers["movieFileSelected"] = handler; }

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	feedback:						The feedback control.
	//	uploadService:					The upload service location.
	//
	this.initialize = function(parameters) {
		_feedback = parameters.feedback;
		_uploadService = parameters.uploadService;
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
		_components.panelMovieSelection = view.find("div.chooseinfo");
		_components.panelMovieUpload = view.find("div.choosefile");

		_components.searchResults = new Showveo.Controls.AddMovie.MovieSearchResults({
			panel: view.find("div.chooseinfo"),
			onSearch: _handlers["search"],
			onMovieSelected: function(movie) {
				_movieID = movie.ID;
				_handlers["movieSelected"](movie);
			}
		});

		_components.upload = new Showveo.Controls.YUIUploader({
			panel: _components.view.find("div.choosefile"),
			feedback: _feedback,
			service: _uploadService,
			onFileSelected: _handlers["movieFileSelected"]
		});
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

	//
	//	Hides the movie selection step.
	//	callback:						The callback function to fire once the movie selection step has been hidden.
	//
	this.hideMovieSelection = function(callback) {
		_components.panelMovieSelection.fadeOut(250, callback);
	}

	//
	//	Shows the movie upload step.
	//
	this.showMovieUpload = function() {
		_components.panelMovieUpload.fadeIn(250);
	}

	//
	//	Starts the upload of the selected file.
	//	file:							The file to upload.
	//
	this.startUpload = function(file) {
		_components.upload.upload(file, _movieID);
	}

	this.base_initialize(parameters, this);
	this.initialize(parameters);
}

Showveo.Views.AddMovieView.prototype = new Showveo.Views.Base;
