Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the manage movies page.
//
Showveo.Models.ManageMoviesModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

	//	The service location.
	var _service;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	service:				The service location.
	//
	this.initialize = function(parameters) {
		_service = parameters.service;
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Retrieves the list of recently uploaded movies.
	//
	this.getRecentlyUploadedMovies = function() {
		$.ajax({
			url: _service + "/recent",
			dataType: "json",
			success: function(movies) {
				_this.notify("recentlyUploadedMovies", movies);
			},
			fixture: function() {
				return [
					[
						{
							id: 1,
							name: "Transformers",
							year: 2007,
							synopsis: "Transformers is a 2007 American live-action film, based on the Transformers toy line. The film is directed by Michael Bay and stars Shia LaBeouf as Sam Witwicky, a teenager involved in a war between the heroic Autobots and the evil Decepticons, two factions of alien robots who can disguise themselves by transforming into everyday machinery. The Decepticons desire control of the All Spark, the object that created their robotic race, with the intention of using it to build an army by giving life to the machines of Earth. Megan Fox, Josh Duhamel, Tyrese Gibson, Jon Voight, Anthony Anderson and John Turturro also star, while voice-actors Peter Cullen and Hugo Weaving voice Optimus Prime and Megatron respectively.Transformers was a huge box office success. The film won four awards from the Visual Effects Society and was nominated for three Academy Awards for Best Sound, Best Visual Effects, and Best Sound Editing.",
							genres: ["Action", "Adventure", "Drama", "Science Fiction"],
							owner: {
								id: 1,
								firstName: "Chris",
								lastName: "Harrington",
								identity: "areallylongidentity",
								password: "",
								emailAddress: "chrisharrington99@gmail.com"
							},
							uploadDate: new Date(),
							lastWatched: null,
							lastWatchedDate: null,
							poster: "/images/test.jpg"
						},
						{
							id: 1,
							name: "Transformers",
							year: 2007,
							synopsis: "Transformers is a 2007 American live-action film, based on the Transformers toy line. The film is directed by Michael Bay and stars Shia LaBeouf as Sam Witwicky, a teenager involved in a war between the heroic Autobots and the evil Decepticons, two factions of alien robots who can disguise themselves by transforming into everyday machinery. The Decepticons desire control of the All Spark, the object that created their robotic race, with the intention of using it to build an army by giving life to the machines of Earth. Megan Fox, Josh Duhamel, Tyrese Gibson, Jon Voight, Anthony Anderson and John Turturro also star, while voice-actors Peter Cullen and Hugo Weaving voice Optimus Prime and Megatron respectively.Transformers was a huge box office success. The film won four awards from the Visual Effects Society and was nominated for three Academy Awards for Best Sound, Best Visual Effects, and Best Sound Editing.",
							genres: ["Action", "Adventure", "Drama", "Science Fiction"],
							owner: {
								id: 1,
								firstName: "Chris",
								lastName: "Harrington",
								identity: "areallylongidentity",
								password: "",
								emailAddress: "chrisharrington99@gmail.com"
							},
							uploadDate: new Date(),
							lastWatched: null,
							lastWatchedDate: null,
							poster: "/images/test.jpg"
						}
					]
				];
			}
		});
	};

	//
	//	Retrieves the list of favorite movies.
	//
	this.getFavoriteMovies = function() {
		$.ajax({
			url: _service + "/favorites",
			dataType: "json",
			success: function(movies) {
				_this.notify("favoriteMovies", movies);
			},
			fixture: function() {
				return [
					[
						{
							id: 1,
							name: "Blah!",
							year: 2007,
							synopsis: "Transformers is a 2007 American live-action film, based on the Transformers toy line. The film is directed by Michael Bay and stars Shia LaBeouf as Sam Witwicky, a teenager involved in a war between the heroic Autobots and the evil Decepticons, two factions of alien robots who can disguise themselves by transforming into everyday machinery. The Decepticons desire control of the All Spark, the object that created their robotic race, with the intention of using it to build an army by giving life to the machines of Earth. Megan Fox, Josh Duhamel, Tyrese Gibson, Jon Voight, Anthony Anderson and John Turturro also star, while voice-actors Peter Cullen and Hugo Weaving voice Optimus Prime and Megatron respectively.Transformers was a huge box office success. The film won four awards from the Visual Effects Society and was nominated for three Academy Awards for Best Sound, Best Visual Effects, and Best Sound Editing.",
							genres: ["Action", "Adventure", "Drama", "Science Fiction"],
							owner: {
								id: 1,
								firstName: "Chris",
								lastName: "Harrington",
								identity: "areallylongidentity",
								password: "",
								emailAddress: "chrisharrington99@gmail.com"
							},
							uploadDate: new Date(),
							lastWatched: null,
							lastWatchedDate: null,
							poster: "/images/test.jpg"
						},
						{
							id: 1,
							name: "Blah!",
							year: 2007,
							synopsis: "Transformers is a 2007 American live-action film, based on the Transformers toy line. The film is directed by Michael Bay and stars Shia LaBeouf as Sam Witwicky, a teenager involved in a war between the heroic Autobots and the evil Decepticons, two factions of alien robots who can disguise themselves by transforming into everyday machinery. The Decepticons desire control of the All Spark, the object that created their robotic race, with the intention of using it to build an army by giving life to the machines of Earth. Megan Fox, Josh Duhamel, Tyrese Gibson, Jon Voight, Anthony Anderson and John Turturro also star, while voice-actors Peter Cullen and Hugo Weaving voice Optimus Prime and Megatron respectively.Transformers was a huge box office success. The film won four awards from the Visual Effects Society and was nominated for three Academy Awards for Best Sound, Best Visual Effects, and Best Sound Editing.",
							genres: ["Action", "Adventure", "Drama", "Science Fiction"],
							owner: {
								id: 1,
								firstName: "Chris",
								lastName: "Harrington",
								identity: "areallylongidentity",
								password: "",
								emailAddress: "chrisharrington99@gmail.com"
							},
							uploadDate: new Date(),
							lastWatched: null,
							lastWatchedDate: null,
							poster: "/images/test.jpg"
						}
					]
				];
			}
		});
	};

	//
	//	Retrieves the list of all movies.
	//
	this.getAllMovies = function() {
		$.ajax({
			url: _service + "/all",
			dataType: "json",
			success: function(movies) {
				_this.notify("allMovies", movies);
			},
			fixture: function() {
				return [
					[
						{
							id: 1,
							name: "Boo!",
							year: 2007,
							synopsis: "Transformers is a 2007 American live-action film, based on the Transformers toy line. The film is directed by Michael Bay and stars Shia LaBeouf as Sam Witwicky, a teenager involved in a war between the heroic Autobots and the evil Decepticons, two factions of alien robots who can disguise themselves by transforming into everyday machinery. The Decepticons desire control of the All Spark, the object that created their robotic race, with the intention of using it to build an army by giving life to the machines of Earth. Megan Fox, Josh Duhamel, Tyrese Gibson, Jon Voight, Anthony Anderson and John Turturro also star, while voice-actors Peter Cullen and Hugo Weaving voice Optimus Prime and Megatron respectively.Transformers was a huge box office success. The film won four awards from the Visual Effects Society and was nominated for three Academy Awards for Best Sound, Best Visual Effects, and Best Sound Editing.",
							genres: ["Action", "Adventure", "Drama", "Science Fiction"],
							owner: {
								id: 1,
								firstName: "Chris",
								lastName: "Harrington",
								identity: "areallylongidentity",
								password: "",
								emailAddress: "chrisharrington99@gmail.com"
							},
							uploadDate: new Date(),
							lastWatched: null,
							lastWatchedDate: null,
							poster: "/images/test.jpg"
						},
						{
							id: 1,
							name: "Boo!",
							year: 2007,
							synopsis: "Transformers is a 2007 American live-action film, based on the Transformers toy line. The film is directed by Michael Bay and stars Shia LaBeouf as Sam Witwicky, a teenager involved in a war between the heroic Autobots and the evil Decepticons, two factions of alien robots who can disguise themselves by transforming into everyday machinery. The Decepticons desire control of the All Spark, the object that created their robotic race, with the intention of using it to build an army by giving life to the machines of Earth. Megan Fox, Josh Duhamel, Tyrese Gibson, Jon Voight, Anthony Anderson and John Turturro also star, while voice-actors Peter Cullen and Hugo Weaving voice Optimus Prime and Megatron respectively.Transformers was a huge box office success. The film won four awards from the Visual Effects Society and was nominated for three Academy Awards for Best Sound, Best Visual Effects, and Best Sound Editing.",
							genres: ["Action", "Adventure", "Drama", "Science Fiction"],
							owner: {
								id: 1,
								firstName: "Chris",
								lastName: "Harrington",
								identity: "areallylongidentity",
								password: "",
								emailAddress: "chrisharrington99@gmail.com"
							},
							uploadDate: new Date(),
							lastWatched: null,
							lastWatchedDate: null,
							poster: "/images/test.jpg"
						}
					]
				];
			}
		});
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Models.ManageMoviesModel.prototype = new Showveo.Models.Base;
});
