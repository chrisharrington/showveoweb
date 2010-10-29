Showveo.Validator.validateNamespace("Showveo.Controls.AddTV");

//
//	A control used to provide the user with file upload functionality.
//
Showveo.Controls.AddTV.Html5Upload = function(parameters) {

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
		_components.upload.startUpload();
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Event Handlers */

	//
	//	Fired after the user has clicked the "browse" button to open the file selection dialog.  Clears the current
	//	queue.
	//
	var fileDialogStarted = function() {
		_components.upload.cancelQueue();
	}

	//
	//	Fired after the user has chosen a file.  Updates the view with the file information.
	//	file:					The queued file.
	//
	var fileQueued = function(file) {
		_components.file = file;
	}

	//
	//	Fired after the user has attempted to queue a file, but an error occurs.  Informs the user of
	//	the error.
	//	file:					The queued file.
	//	code:					The error code.
	//	message:				The error message.
	//
	var fileQueueError = function(file, code, message) {
		_components.queueError = { code: code, message: message };
	}

	//
	//	Fired after the user has successfully chosen a file to upload.  Updates the control with the chosen file's
	//	information.
	//	numselected:			The number of selected files.
	//	numqueued:				The number of queued files from this selection.
	//	totalqueue:				The total number of files in the queue.
	//
	var fileDialogComplete = function(numselected, numqueued, totalqueue) {
		try {
			if (numselected > 1 || numqueued > 1 || totalqueue > 1)
				throw "Please upload one file at a time!";

			if (_components.queueError) {
				var error = _components.queueError;
				if (error.code == SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE)
					throw "Zero byte files cannot be uploaded.  Please select another file.";
				if (error.code == SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT)
					throw "The file you have selected is too large.  Please select another file.";
				if (error.code == SWFUpload.QUEUE_ERROR.INVALID_FILETYPE)
					throw "The file you have selected is of an invalid type.  Please select another file.";
			}

			_feedback.clear();
			_components.textFileName.val(_components.file.name);
			_handlers.fileSelected({ name: _components.file.name, size: _components.file.size });
		} catch (error) {
			_components.upload.cancelQueue();
			_feedback.error(error);
		}

		_components.queueError = undefined;
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

		_components.upload = _components.panel.find("input[type='file']").html5_upload();

		alert($.html5_upload);
	}

	this.initialize(parameters);
};

