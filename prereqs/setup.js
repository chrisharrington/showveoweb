var Showveo = {};

//
//	Sets up the application.
//
$(document).ready(function() {

	Showveo.Validator.validateInheritance();

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The container for required objects.
	var _container;

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
		container.Controllers.LandingController.load();

		$(document).bind("ajaxError", function(status, request, error) {
			error = container.Controls.Feedback.error;
			status = parseInt(request.status);
			if (status <= 510) {
				error("An unexpected technical error has occurred.  Our support staff have been notified.  Please try again later!");
				Showveo.Error = request.responseText;
			}
			else if (status > 510)
				error("Error!!1");
		});
		
		_container = container;
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after a user has signed in.  Shows the default landing page for the user.
	//
	var onSignIn = function() {
		_container.Controllers.LandingController.signIn();
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
		container.Controls.Cookie = new Showveo.Controls.Cookie();
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
		container.Models.LandingModel = new Showveo.Models.LandingModel({});
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

		container.Views.LandingView = new Showveo.Views.LandingView({
			path: "views/landing/landing",
			model: container.Models.LandingModel,
			feedback: container.Controls.Feedback
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
			feedback: container.Controls.Feedback,
			cookie: container.Controls.Cookie,
			onSignIn: onSignIn
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

		container.Controllers.LandingController = new Showveo.Controllers.LandingController({
			panel: panel,
			view: container.Views.LandingView,
			model: container.Models.LandingModel,
			feedback: container.Controls.Feedback,
			onMovieSelection: function() { container.Controllers.AddMovieController.load(); }
		});
	};

	this.initialize();
});