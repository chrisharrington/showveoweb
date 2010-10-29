/*
	The initial setup file for the application.
 */
var Showveo = {};

$(document).ready(function() {
	if (!window.Showveo)
		window.Showveo = {};

	new Showveo.Controllers.GuestController({
		view: "header/guest.html",
		model: new Showveo.Models.GuestModel({})
	});
});
