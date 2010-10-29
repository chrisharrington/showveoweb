var Showveo = {};

//
//	Sets up the application.
//
$(document).ready(function() {

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//
	this.initialize = function() {
		var container = {};
		loadControls(container);
		loadViews(container);
		loadModels(container);
		loadControllers(container);
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the necessary control objects and stores them in the given container.
	//	container:						Holds the loaded controls, referenced by namespace.
	//
	var loadControls = function(container) {
		container.Controls = {};
		container.Controls.Feedback = new Showveo.Controls.Feedback({ panel: $("div.feedback") });
	}

	//
	//	Loads the necessary view objects and stores them in the given container.
	//	container:						Holds the loaded views, referenced by namespace.
	//
	var loadViews = function(container) {
		container.Views = {};
		container.Views.AddTVView = new Showveo.Views.Base({ path: "views/tv/add/addTV" });
	}

	//
	//	Loads the necessary model objects and stores them in the given container.
	//	container:						Holds the loaded models, referenced by namespace.
	//
	var loadModels = function(container) {
		container.Models = {};
		container.Models.AddTVModel = new Showveo.Models.AddTVModel({});
	}

	//
	//	Loads the necessary controller objects and stores them in the given container.  Assumes
	//	that views and models have been loaded into the same container.
	//	container:						Holds the loaded contollers, referenced by namespace.
	//
	var loadControllers = function(container) {
		container.Controllers = {};
		container.Controllers.AddTVController = new Showveo.Controllers.AddTVController({
			panel: $("div.content>div"),
			view: container.Views.AddTVView,
			model: container.Models.AddTVModel,
			feedback: container.Controls.Feedback
		});
	}

	this.initialize();
});