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
		loadModels(container);
		loadViews(container);
		loadControllers(container);

		container.Controllers.AddMovieController.load();
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
	//	Loads the necessary model objects and stores them in the given container.
	//	container:						Holds the loaded models, referenced by namespace.
	//
	var loadModels = function(container) {
		container.Models = {};
		container.Models.AddTVModel = new Showveo.Models.AddTVModel({});
		container.Models.AddMovieModel = new Showveo.Models.AddMovieModel({ apikey: "c26c67ed161834067f4d91430df1024e" });
	}

	//
	//	Loads the necessary view objects and stores them in the given container.
	//	container:						Holds the loaded views, referenced by namespace.
	//
	var loadViews = function(container) {
		container.Views = {};
		container.Views.AddTVView = new Showveo.Views.Base({ path: "views/tv/add/addTV" });
		container.Views.AddMovieView = new Showveo.Views.AddMovieView({ path: "views/movie/add/addMovie", model: container.Models.AddMovieModel, feedback: container.Controls.Feedback });
	}

	//
	//	Loads the necessary controller objects and stores them in the given container.  Assumes
	//	that views and models have been loaded into the same container.
	//	container:						Holds the loaded contollers, referenced by namespace.
	//
	var loadControllers = function(container) {
		container.Controllers = {};
		var panel = $("div.content>div>div");

		container.Controllers.AddTVController = new Showveo.Controllers.AddTVController({
			panel: panel,
			view: container.Views.AddTVView,
			model: container.Models.AddTVModel,
			feedback: container.Controls.Feedback
		});

		container.Controllers.AddMovieController = new Showveo.Controllers.AddMovieController({
			panel: panel,
			view: container.Views.AddMovieView,
			model: container.Models.AddMovieModel,
			feedback: container.Controls.Feedback
		});
	}

	this.initialize();
});