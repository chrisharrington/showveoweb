Showveo.Validator.validateNamespace("Showveo.Controllers");

/*
	The base controller.  All other controllers inherit from this class.
 */
Showveo.Controllers.Base = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The panel into which the view is loaded.
	var _panel;

	//	The view to be loaded.
	var _view;

	//	The implementer of this class.
	var _implementer;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Returns the view.
	this.getView = function() { return _view; };

	//	Returns the model.
	this.getModel = function() { return _model; };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:						The panel into which the view contents should be inserted.
	//	view:						The view to be loaded.
	//	implementer:				The implementer of this base class.
	//
	this.base_initialize = function(parameters, implementer) {
		_panel = parameters.panel;
		_view = parameters.view;
		_implementer = implementer;
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//  Loads the view and controller.
	//  data:                                                   Any data that might be required for the implementer.
	//
	this.load = function(data) {
		if (_implementer.preload)
			_implementer.preload();

		_view.load(function() {
			if (_implementer.loaded)
				_implementer.loaded(data);
		});
	};
};