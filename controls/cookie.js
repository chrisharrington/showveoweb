Showveo.Validator.validateNamespace("Showveo.Controls");

//
//	A control used to read and write cookie values.
//
Showveo.Controls.Cookie = function(parameters) {

	//------------------------------------------------------------------------------------------------------------------
	/* Data Members */

	//	Maintains scope.
	var _this = this;

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

	//
	//	Reads a cookie value.
	//	key:				The cookie value key.
	//
	this.read = function(key) {
		var value;
		$(document.cookie.split(";")).each(function(index, cookie) {
			var parts = cookie.split("=");
			if (parts[0] == key) {
				value = parts[1];
				return true;
			}
		});
		return value;
	};

	//
	//	Removes a cookie.
	//	key:				The cookie key.
	//
	this.remove = function(key) {
		var value = _this.read(key);
		if (!value)
			return;

		var date = new Date();
		date.setFullYear(1980);
		_this.write(key, value, date)
	};

};