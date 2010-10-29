Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The base view.
//
Showveo.Views.Base = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	A container for view components.
	var _components;

	//	The path of the html for the view.
	var _path;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	path:						The path of the html code for the inheriting view.
	//
	this.initialize = function(parameters) {
		_path = parameters.path;
		_components = {};
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the view's html code.
	//	callback:					The callback function to execute once the load has completed.
	//
	this.load = function(callback) {
		if (!_path)
			return;

		$.get(_path + ".html", function(html) {
			if (callback)
				callback(html);
		});

		$("head").append($("<link>").attr({ type: "text/css", rel: "stylesheet", href: _path + ".css" }));
	}

	this.initialize(parameters);
};