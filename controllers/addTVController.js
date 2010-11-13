Showveo.Validator.validateNamespace("Showveo.Controllersr");

//
//	A controller used to provide event delegation for adding a TV show.
//
Showveo.Controllers.AddTVController = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the controller.
	var _components;

	//	The model for the controller.
	var _model;

	//	The feedback control.
	var _feedback;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	view:							The add TV view.
	//	model:							The add TV model.
	//	feedback:						The feedback control.
	//
	this.initialize = function(parameters) {
		_model = parameters.model;
		_feedback = parameters.feedback;
		_components = {};
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Loads the components for the controller.
	//	view:							The add TV view.
	//
	this.loadComponents = function(view) {
		_components.view = view;
		_components.panelFile = view.find("div.file");
		_components.labelFileName = view.find("div.file b:first");
		_components.labelFileSize = view.find("div.file b:last");
		_components.buttonUpload = view.find("div.file input[type='button']").click(buttonUploadClicked);

		_components.upload = new Showveo.Controls.YUIUploader({
			panel: _components.view.find("div.choosefile"),
			feedback: _feedback,
			fileSelected: fileSelected
		});
	};

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the header has selected a file.  Displays the file information to the header.
	//	file:							The selected file.
	//
	var fileSelected = function(file) {
		_components.labelFileName.text(file.name);
		_components.labelFileSize.text(file.size + " bytes");
		_components.panelFile.slideDown(250);
	};

	//
	//	Fired after the header has clicked on the upload button.  Begins the upload of the selected file.
	//
	var buttonUploadClicked = function() {
		_components.upload.upload();
	};

	this.base_initialize(parameters, this);
	this.initialize(parameters);
};

Showveo.Validator.addInheritance(function() {
	Showveo.Controllers.AddTVController.prototype = new Showveo.Controllers.Base;
});