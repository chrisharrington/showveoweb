Showveo.Validator.validateNamespace("Showveo.Models");

//
//	The model for the add TV page.
//
Showveo.Models.AddTVModel = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//------------------------------------------------------------------------------------------------------------------
	/* Constructors */

	//
	//	The default constructor.
	//	
	//
	this.initialize = function(parameters) {
		
	}

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Uploads the given file to the server for processing.
	//	file:						The file to upload.
	//
	this.uploadFile = function(file) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4)
				alert("done");
		}
		request.open("POST", "/ShowveoService/FileUploadService.svc", true);
		request.send(file);
	}

	this.initialize(parameters);
};