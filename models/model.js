Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The base model.
//
Showveo.Models.Base = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The list of views to notify.
	var _views;

	//	The results container.
	var _results;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Returns a result set.
	this.getResults = function(key) { return _results[key]; };

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//
	this.base_initialize = function(parameters) {
		_views = new Array();
		_results = {};
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Adds a view to the notification list.
	//	view:						The view to add.
	//
	this.register = function(view) {
		_views.push(view);
	}

	//
	//	Notifies all of the views of a state change.
	//	handler:					The view handler to execute.
	//	data:						The data to give to the executed handler.
	//
	this.notify = function(handler, data) {
		_results[handler] = data;

		$(_views).each(function(index, view) {
			if (view[handler])
				view[handler]();
		});
	}
};
