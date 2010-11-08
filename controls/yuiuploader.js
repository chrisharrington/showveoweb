Showveo.Validator.validateNamespace("Showveo.Controls");

//
//	A control used to provide the user with file upload functionality.
//
Showveo.Controls.YUIUploader = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the control.
	var _components;

	//	The feedback control.
	var _feedback;

	//	The event handlers container.
	var _handlers;

	//	The upload service location.
	var _service;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:					The panel containing the control elements.
	//	feedback:				The feedback control.
	//	service:				The upload service location.
	//	onFileSelected:			The callback function to execute once the user has chosen a valid file.
	//
	this.initialize = function(parameters) {
		_feedback = parameters.feedback;
		_service = parameters.service;
		_handlers = { onFileSelected: parameters.onFileSelected };

		loadComponents(parameters.panel);
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Begins the upload process for the currently selected file.
	//	file:					The file to upload.
	//	movieID:				The ID of the movie to upload.
	//
	this.upload = function(file, movieID) {
		_components.upload.upload(file.id, _service + movieID, "POST")
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user has successfully chosen a file to upload.  Updates the control with the chosen file's
	//	information.
	//	file:					The queued file.
	//
	var fileSelect = function(file) {
		if (file.size == 0)
			throw "The file you have chosen has a size of zero bytes.  Please select another file.";

		_feedback.clear();
		_components.textFileName.val(file.name);
		_handlers.onFileSelected(file);
		_components.file = file;
	}

	//
	//	Fired after an error occurs during upload.  Displays an error message to the user.
	//	error:					The error message.
	//
	var fileError = function(error) {
		alert(error);
	}

    //
    //  Fired after a file has finished uploading.  Displays a success message to the user.
    //  event:                  The event object.
	//	id:						The queue ID.
	//	file:					The file that uploaded successfully.
	//	response:				The server response.
	//	data:					The data sent back from the server.
	//
	var fileComplete = function(event, id, file, response, data) {
		alert(response);
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Private Methods */

	//
	//	Loads the components for the control.
	//	panel:					The panel containing the control elements.
	//
	var loadComponents = function(panel) {
		_components = {};
		_components.panel = panel;
		_components.textFileName = panel.find("div.input>input[type='text']");

		YAHOO.widget.Uploader.SWFURL = "resources/yuiuploader.swf";
        _components.upload = new YAHOO.widget.Uploader("yuiuploader", "/images/uploadbutton.png");
		_components.upload.addListener("fileSelect", function(event) { fileSelect({ name: event.fileList["file0"].name, id: event.fileList["file0"].id, size: event.fileList["file0"].size }); });
		_components.upload.addListener("uploadError", function(event) { alert("error: " + event.status); });
		_components.upload.addListener("uploadComplete", function() { alert("success!"); });
		_components.upload.addListener("uploadCompleteData", function(event) { alert(event.data); });
	}

	this.initialize(parameters);
};