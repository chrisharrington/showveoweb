var Showveo = {};

//
//	Sets up the application.
//
$(document).ready(function() {

	Showveo.Validator.validateInheritance();

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The state manager.
	var _state;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//
	this.initialize = function() {
		var container = {};

		_state = new Showveo.Controls.State();

        loadFactories(container);
		loadControls(container);
		loadModels(container);
		loadViews(container);
		loadControllers(container);
		loadErrorHandlers(container.Controls.Feedback);

		_state.initialize(container.Controllers, container.Controls.Cookie.read("identity"));
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

    //
    //  Loads the necesary factory objects and stores them in the given container.
    //  container:                                             Holds the loaded factories, referenced by namespace.
    //
    var loadFactories = function (container) {
		container.Factories = {};
		container.Factories.MoviePanelFactory = new Showveo.Factories.MoviePanelFactory({});
    };

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
        var service = "http://localhost:3001/";

		container.Models = {};
		container.Models.GuestModel = new Showveo.Models.GuestModel({ service: service + "guest" });
		container.Models.AddTVModel = new Showveo.Models.AddTVModel({});
		container.Models.AddMovieModel = new Showveo.Models.AddMovieModel({ service: service + "movie", apikey: "c26c67ed161834067f4d91430df1024e" });
		container.Models.LandingModel = new Showveo.Models.LandingModel({ service: service + "landing" });
		container.Models.HeaderModel = new Showveo.Models.HeaderModel({ service: service + "header" });
        container.Models.ManageMoviesModel = new Showveo.Models.ManageMoviesModel({ service: service + "movies" });
		container.Models.MovieDetailsModel = new Showveo.Models.MovieDetailsModel({ service: service + "movie" });
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
            feedback: container.Controls.Feedback,
			moviePanelFactory: container.Factories.MoviePanelFactory
        });

		container.Views.MovieDetailsView = new Showveo.Views.MovieDetailsView({
			path: "views/movie/details/movieDetails",
			panel: panel,
			model: container.Models.MovieDetailsModel,
			feedback:container.Controls.Feedback
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
			onSignIn: _state.signIn
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
			onSignIn: _state.signIn,
			onSignOut: _state.signOut
		});

        container.Controllers.ManageMoviesController = new Showveo.Controllers.ManageMoviesController({
            view: container.Views.ManageMoviesView,
            model: container.Models.ManageMoviesModel,
			onTabSelected: function(name) { _state.setState("movies/" + name); },
			onMovieSelected: function(movie) { _state.setStateRefresh("movie/" + movie.name.replace(/ /g, "_") + "_" + movie.year); }
        });

		container.Controllers.MovieDetailsController = new Showveo.Controllers.MovieDetailsController({
			view: container.Views.MovieDetailsView,
			model: container.Models.MovieDetailsModel,
			onGenreSelected: function(genre) { alert("genre " + genre); }
		});
	};

	//
	//	Loads the error handlers.
	//	feedback:				The feedback control.
	//
	var loadErrorHandlers = function(feedback) {
		$(document).bind("ajaxError", function(status, request, error) {
			error = feedback.error;
			status = parseInt(request.status);
			if (status <= 510) {
				error("An unexpected technical error has occurred.  Our support staff have been notified.  Please try again later!");
				Showveo.Error = request.responseText;
			}
			else if (status > 510)
				error("Error!!1");
		});
	};

	this.initialize();
});