Showveo.Validator.validateNamespace("Showveo.Factories");

//
//  A factory used to create movie panels.
//
Showveo.Factories.MoviePanelFactory = function(parameters) {

    //------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

    //
    //	Creates a movie panel for the manage movies page.
    //  	movie:		The movie for which to create a panel.
	//	Returns:		The 	created movie panel.
    //
    this.create = function(movie) {
    	var panel = $("<div></div>").addClass("movie");
		panel.append($("<img />").attr("src", movie.poster).attr("alt", ""));
		panel.append(createOverview(movie));
		return panel;
    };

    //------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Creates the overview panel for the movie.
	//	movie:		The movie for which to create the overview panel.
	//	Returns:		The created overview panel.
	//
	var createOverview = function (movie) {
		var panel = $("<div></div>");
		panel.append($("<a></a>").text(movie.name + " (" + movie.year + ")"));
		panel.append($("<i></i>").html("Uploaded by <b>" + movie.owner.firstName + " " + movie.owner.lastName + "</b> " + movie.uploadDate.differenceString() + ". " + deriveLastWatched(movie)));
		panel.append($("<u></u>").text(movie.synopsis));
		panel.append(createFooter(movie));
		return panel;
	};

	//
	//	Derives a string from the last watched date of the movie.
	//	movie:		The movie.
	//	Returns:		The last watched string.
	//
	var deriveLastWatched = function (movie) {
		if (!movie.lastWatched)
			return "This movie has never been watched.";

		return "Last watched by <b>" + movie.lastWatched.firstName + " " + movie.lastWatched.lastName + "</b> " + movie.lastWatchedDate.differenceString() + ".";
	};

	//
	//	Creates the footer for the movie panel.
	//	movie:		The movie for which to create a footer.
	//	Returns:		The created movie panel.
	//
	var createFooter = function (movie) {
		var panel = $("<div></div>");
		panel.append(createGenres(movie));
		panel.append($("<img />").attr("src", "/images/favorite.png").attr("alt", "").attr("title", "Mark this movie as a favorite."));
		panel.append($("<img />").attr("src", "/images/delete.png").attr("alt", "").attr("title", "Delete this movie."));
		return panel;
	};

	//
	//	Creates the genre panel for a movie.
	//	movie:		The movie for which to create the genre panel.
	//	Returns:		The created genre panel.
	var createGenres = function (movie) {
		var panel = $("<div></div>");
		$(movie.genres).each(function(index, genre) {
			panel.append($("<a></a>").text(genre));
		});
		return panel;
	};
};