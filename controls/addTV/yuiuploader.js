Showveo.Validator.validateNamespace("Showveo.Controls.AddTV");

//
//	A control used to provide the user with file upload functionality.
//
Showveo.Controls.AddTV.YUIUploader = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	The common components for the control.
	var _components;

	//	The feedback control.
	var _feedback;

	//	The event handlers container.
	var _handlers;

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	panel:					The panel containing the control elements.
	//	feedback:				The feedback control.
	//	fileSelected:			The callback function to execute once the user has chosen a valid file.
	//
	this.initialize = function(parameters) {
		_feedback = parameters.feedback;
		_handlers = { fileSelected: parameters.fileSelected };

		loadComponents(parameters.panel);
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Begins the upload process for the currently selected file.
	//
	this.upload = function() {
		_components.upload.upload(_components.file.id, "http://localhost/showveoservice/fileuploadservice.svc/", "POST")
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user has successfully chosen a file to upload.  Updates the control with the chosen file's
	//	information.
	//	file:					The queued file.
	//
	var fileSelect = function(file) {
		try {
			if (file.size == 0)
				throw "The file you have chosen has a size of zero bytes.  Please select another file.";

			_feedback.clear();
			_components.textFileName.val(file.name);
			_handlers.fileSelected({ name: file.name, size: file.size });
			_components.file = file;
		} catch (error) {
			_feedback.error(error);
		}

		return false;
	}

	//
	//	Fired when an error occurs during the upload of a file.  Displays an error message to the user.
	//	file:					The file that failed to upload.
	//	code:					The error code.
	//	message:				The error message.
	//
	var uploadError = function(file, code, message) {
		_feedback.error(code + " - " + message);
	}

	//
	//	Fired after the upload has successfully been uploaded.  Informs the user.
	//	file:					The successfully uploaded file object.
	//	data:					The server data.
	//	response:				The server response.
	//
	var uploadSuccess = function(file, data, response) {
		alert(data);
		alert(response);
	}

	//
	//	Fired when the upload has completed.  Doesn't care if an error occurred or if the file was uploaded
	//	successfully.
	//
	var uploadComplete = function() {
		alert("complete");
	}

	//
	//	Fired after an error occurs during upload.  Displays an error message to the user.
	//	error:					The error message.
	//
	var fileError = function(error) {
		//_feedback.error("An error has occurred while uploading your chosen file.  Please try again later!");
		_feedback.error(error);;
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
        _components.upload = new YAHOO.widget.Uploader("yuiuploader", "http://localhost/showveo/images/uploadbutton.png");
		_components.upload.addListener("fileSelect", function(event) { fileSelect({ name: event.fileList["file0"].name, id: event.fileList["file0"].id, size: event.fileList["file0"].size }); });
		_components.upload.addListener("uploadError", function(event) { fileError(event.status); });
		_components.upload.addListener("uploadComplete", function() { alert("success!"); });
		_components.upload.addListener("uploadCompleteData", function(event) { alert(event.data); });
	}

	this.initialize(parameters);
};