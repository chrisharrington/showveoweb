Showveo.Validator.validateNamespace("Showveo.Controls.AddMovie");

//
//	A control used to display a movie search result.
//
Showveo.Controls.AddMovie.MoviePanelCreator = new function() {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components.
	var _components;

	//	The movie details modal dialog panel.
	var _details;

	//	The selected movie.
	var _movie;

	//------------------------------------------------------------------------------------------------------------------
	/* Properties */

	//	Returns the selected movie.
	this.getMovie = function() { return _movie; }

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	The default constructor.
	//	panel:						The panel into which the movie panel should be inserted.
	//	movie:						The movie being wrapped.
	//	details:					The movie details modal dialog panel.
	//
	this.create = function(parameters) {
		loadComponents(parameters.panel, parameters.details);
		createMoviePanel(parameters.movie).insertBefore(parameters.panel.find(">div.count")).slideDown(250);
	}

	//
	//	Hides the details panel.
	//
	this.hideDetails = function() {
		_components.details.modal("hide");
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common components for the control.
	//	panel:						The panel into which the movie panel should be inserted.
	//	details:					The movie details panel.
	//
	var loadComponents = function(panel, details) {
		_components = {};
		_components.panel = panel;
		_components.details = details;
		_components.labelMovieName = details.find(">span");
		_components.labelMovieOverview = details.find(">div>span");
		_components.imageMoviePoster = details.find("img");
	}

	//
	//	Creates a panel to wrap a movie.
	//	movie:							The movie.
	//	Returns:						The created panel.
	//
	var createMoviePanel = function(movie) {
		var panel = $("<div></div>").addClass("rounded pointer").attr("name", movie.ID).hide().click(function() { load(movie); _components.details.modal("show"); });
		panel.append($("<i></i>").text(movie.Name + (movie.Year == "" ? "" : " (" + movie.Year + ")")));
		panel.append($("<b></b>"));
		return panel;
	}

	//
	//	Loads the movie details into the details panel.
	//	movie:							The movie to load.
	//
	var load = function(movie) {
		var title = movie.Name;
		if (movie.Year)
			title += " (" + movie.Year + ")";

		_components.labelMovieName.text(title);
		_components.labelMovieOverview.text(movie.Overview);
		_components.imageMoviePoster.attr("src", "").attr("src", movie.PosterUrl).show();
		if (movie.PosterUrl == "")
			_components.imageMoviePoster.hide();

		_movie = movie;
	}
}
