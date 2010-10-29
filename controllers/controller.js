Showveo.Validator.validateNamespace("Showveo.Controllers");

/*
	The base controller.  All other controllers inherit from this class.
 */
Showveo.Controllers.Base = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The view for the controller.
	var _view;

	//	The model for the controller.
	var _model;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Returns the view.
	this.getView = function() { return _view; }

	//	Returns the model.
	this.getModel = function() { return _model; }

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:						The panel into which the view contents should be inserted.
	//	view:						The view for the controller.
	//	model:						The model for the controller.
	//	implementor:				The implementor of this base class.
	//
	this.base_initialize = function(parameters, implementer) {
		_view = parameters.view;
		_model = parameters.model;

		_view.load(function(html) {
			html = $(html);
			parameters.panel.append(html);
			implementer.loadComponents($("div.content>div>div"));
		});
	}
};