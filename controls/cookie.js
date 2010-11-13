Showveo.Validator.validateNamespace("Showveo.Controls");

//
//	A control used to read and write cookie values.
//
Showveo.Controls.Cookie = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Public Methods */

	//
	//	Writes a cookie.
	//	key:				The cookie key.
	//	value:				The cookie value.
	//	expiry:				The expiry date or nothing if the cookie never expires.
	//
	this.write = function(key, value, expiry) {
		if (!expiry) {
			expiry = new Date();
			expiry.setFullYear(expiry.getFullYear()+1);
		}

		document.cookie = key + "=" + value + "; expires=" + expiry.toGMTString() + "; path=/";
	};

};