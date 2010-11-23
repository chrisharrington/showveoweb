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
		loadErrorHandlers();

		_container = container;

		load();
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after a user has signed in.  Shows the default landing page for the user.
	//	user:							The signed in user.
	//
	var onSignIn = function(user) {
		//_container.Controllers.LandingController.load();
        _container.Controllers.ManageMoviesController.load();
		_container.Controllers.HeaderController.user(user);
	};

	//
	//	Fired after a user has signed out.  Redirects the user to the landing page.
	//
	var onSignOut = function() {
		_container.Controllers.GuestController.load();
		_container.Controllers.HeaderController.guest();
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
		//container.Controls.Header = new Showveo.Controls.Header({ panel: $("div.header"), cookie: container.Controls.Cookie, onSignIn: onSignIn, onSignOut: onSignOut });
	};

	//
	//	Loads the necessary model objects and stores them in the given container.
	//	container:						Holds the loaded models, referenced by namespace.
	//
	var loadModels = function(container) {
        var service = "http://localhost:3000/";

		container.Models = {};
		container.Models.GuestModel = new Showveo.Models.GuestModel({ service: service + "guest" });
		container.Models.AddTVModel = new Showveo.Models.AddTVModel({});
		container.Models.AddMovieModel = new Showveo.Models.AddMovieModel({ service: service + "movie", apikey: "c26c67ed161834067f4d91430df1024e" });
		container.Models.LandingModel = new Showveo.Models.LandingModel({ service: service + "landing" });
		container.Models.HeaderModel = new Showveo.Models.HeaderModel({ service: service + "header" });
        container.Models.ManageMoviesModel = new Showveo.Models.ManageMoviesModel({ service: service + "movie" });
	};

	//
	//	Loads the necessary view objects and stores them in the given container.
	//	container:						Holds the loaded views, referenced by namespace.
	//
	var loadViews = function(container) {
		var panel = $("div.content>div>div");
		container.Views = {};

		container.Views.GuestView = new Showveo.Views.GuestView({
			path: "views/guest/guest",
			panel: panel,
			model: container.Models.GuestModel,
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
			panel: panel,
			model: container.Models.LandingModel,
			feedback: container.Controls.Feedback
		});

		container.Views.HeaderView = new Showveo.Views.HeaderView({
			path: "views/header/header",
			panel: $("div.header>div"),
			model: container.Models.HeaderModel,
			feedback: container.Controls.Feedback
		});

        container.Views.ManageMoviesView = new Showveo.Views.ManageMoviesView({
            path: "views/movie/manage/manageMovies",
            panel: panel,
            model: container.Models.ManageMoviesModel,
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

		container.Controllers.GuestController = new Showveo.Controllers.GuestController({
			view: container.Views.GuestView,
			model: container.Models.GuestModel,
			header: container.Controls.Header,
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
			view: container.Views.LandingView,
			model: container.Models.LandingModel,
			feedback: container.Controls.Feedback,
			identity: container.Controls.Cookie.read("identity"),
			onMovieSelection: function() { container.Controllers.AddMovieController.load(); }
		});

		container.Controllers.HeaderController = new Showveo.Controllers.HeaderController({
			view: container.Views.HeaderView,
			model: container.Models.HeaderModel,
			cookie: container.Controls.Cookie,
			onSignIn: onSignIn,
			onSignOut: onSignOut
		});

        container.Controllers.ManageMoviesController = new Showveo.Controllers.ManageMoviesController({
            view: container.Views.ManageMoviesView,
            model: container.Models.ManageMoviesModel
        });
	};

	//
	//	Loads the error handlers.
	//
	var loadErrorHandlers = function() {
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
	};

	//
	//	Loads the application.
	//
	var load = function() {
		_container.Controllers.HeaderController.load();
		if (!_container.Controls.Cookie.read("identity"))
			_container.Controllers.GuestController.load();
	};

	this.initialize();
});