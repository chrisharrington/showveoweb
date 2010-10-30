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

		_components.textMovieSearchName = view.find("div.chooseinfo>div.input>input[type='text']");
		_components.buttonSearch = view.find("div.chooseinfo>div.input>input[type='button']").click(function() { if (_handlers["search"]) _handlers["search"](_components.textMovieSearchName.val()); });

		/*_components.upload = new Showveo.Controls.YUIUploader({
			panel: _components.view.find("div.choosefile"),
			feedback: _feedback,
			fileSelected: fileSelected
		});*/
	}

	//
	//	Sets the result of a search.
	//	movies:							The search results.
	//
	this.searchResults = function(movies) {
		try {
			if (movies.length == 0)
				throw "No movies were found.";

			alert(movies.length);
		} catch(e) {
			_this.error(e);
		}
	}

	this.base_initialize(parameters, this);
	this.initialize(parameters);
}

Showveo.Views.AddMovieView.prototype = new Showveo.Views.Base;
