
Showveo.Validator.validateNamespace("Showveo.Views");

//
//	The base view.
//
Showveo.Views.Base = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	A container for view components.
	var _components;

	//	The implementer of this class.
	var _implementer;

	//	The path of the html for the view.
	var _path;

	//	The feedback control.
	var _feedback;

	//	The panel into which the view should be loaded.
	var _panel;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	model:						The model.
	//	path:						The path of the html code for the inheriting view.
	//	feedback:					The feedback control.
	//	panel:						The panel into which the view should be loaded.
	//	container:					The container into which the view should be loaded.
	//
	this.base_initialize = function(parameters, implementer) {
		parameters.model.register(implementer);

		_implementer = implementer;
		_path = parameters.path;
		_feedback = parameters.feedback;
		_panel = parameters.panel;
		_components = {};

		_this.model = parameters.model;
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the view's html code.
	//	panel:						The panel into which the html should be loaded.
	//	callback:					The callback function to execute once the view is loaded.
	//
	this.load = function(callback) {
		if (!_path)
			return;

		_panel.hide();

		$.get(_path + ".html", function(html) {
			_panel.empty().append(html).show();

			_implementer.loadComponents(_panel);

			if (callback)
				callback();
		});

		$("head").append($("<link>").attr({ type: "text/css", rel: "stylesheet", href: _path + ".css" }));
	};

	//
	//	Shows an error message.
	//
	this.error = function(message) {
		var error = message ? message : _this.model.getResults("error")
		_feedback.error(error);
	}
};