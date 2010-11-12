var Showveo = {};

//
//	Sets up the application.
//
$(document).ready(function() {

	Showveo.Validator.validateInheritance();

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

		container.Controllers.HeaderController.load();
		container.Controllers.AddMovieController.load();

		$(document).bind("ajaxError", function(status, request, error) {
			error = container.Controls.Feedback.error;
			status = parseInt(request.status);
			if (status <= 510)
				error("An unexpected technical error has occurred.  Our support staff have been notified.  Please try again later!");
			else if (status > 510)
				error("Error!!1");
		});
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the necessary control objects and stores them in the given container.
	//	container:						Holds the loaded controls, referenced by namespace.
	//
	var loadControls = function(container) {
		container.Controls = {};
		container.Controls.Feedback = new Showveo.Controls.Feedback({ panel: $("div.feedback") });
	};

	//
	//	Loads the necessary model objects and stores them in the given container.
	//	container:						Holds the loaded models, referenced by namespace.
	//
	var loadModels = function(container) {
		container.Models = {};
		container.Models.HeaderModel = new Showveo.Models.HeaderModel({ service: "http://localhost:3000/data"});
		container.Models.AddTVModel = new Showveo.Models.AddTVModel({});
		container.Models.AddMovieModel = new Showveo.Models.AddMovieModel({ service: "http://localhost:3000/movie", apikey: "c26c67ed161834067f4d91430df1024e" });
	};

	//
	//	Loads the necessary view objects and stores them in the given container.
	//	container:						Holds the loaded views, referenced by namespace.
	//
	var loadViews = function(container) {
		container.Views = {};

		container.Views.HeaderView = new Showveo.Views.HeaderView({
			path: "views/header/header",
			model: container.Models.HeaderModel,
			feedback: container.Controls.Feedback
		});

		container.Views.AddTVView = new Showveo.Views.Base({ path: "views/tv/add/addTV" });
		
		container.Views.AddMovieView = new Showveo.Views.AddMovieView({
			path: "views/movie/add/addMovie",
			model: container.Models.AddMovieModel,
			feedback: container.Controls.Feedback,
			uploadService: "/upload/movie/"
		});
	};

	//
	//	Loads the necessary controller objects and stores them in the given container.  Assumes
	//	that views and models have been loaded into the same container.
	//	container:						Holds the loaded contollers, referenced by namespace.
	//
	var loadControllers = function(container) {
		container.Controllers = {};
		var panel = $("div.content>div>div");

		container.Controllers.HeaderController = new Showveo.Controllers.HeaderController({
			panel: $("div.header>div"),
			view: container.Views.HeaderView,
			model: container.Models.HeaderModel,
			feedback: container.Controls.Feedback
		});

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
	};

	this.initialize();
});