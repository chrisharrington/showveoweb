Showveo.Validator.validateNamespace("Showveo.Controls");

//
//	The control used to display global error, success and working messages to the user.
//
Showveo.Controls.Feedback = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the control.
	var _components;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:							The panel containing the control elements.
	//
	this.initialize = function(parameters) {
		loadComponents(parameters.panel);
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Shows an error message.
	//	message:						The error message.
	//
	this.error = function(message) {
		_components.panel.removeClass("success").removeClass("working").addClass("error");
		show(message);
	}

	//
	//	Clears the currently displayed message.
	//
	this.clear = function() {
		clear();
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user clicks the hide link.  Hides the feedback control.
	//
	var hideClicked = function() {
		clear();
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the common components for the control.
	//	panel:							The panel containing the control elements.
	//
	var loadComponents = function(panel) {
		_components = {};
		_components.panel = panel;
		_components.label = panel.find("span");
		_components.hide = panel.find("a").click(hideClicked);
	}

	//
	//	Shows the given message.
	//	message:						The message to show.
	//
	var show = function(message) {
		_components.panel.slideUp(250, function() {
			_components.label.text(message);
			_components.panel.slideDown(250);
		});
	}

	//
	//	Clears the currently displayed message.
	//
	var clear = function() {
		_components.panel.slideUp(250);	
	}

	this.initialize(parameters);
};