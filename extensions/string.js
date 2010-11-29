//
//	Extension methods for the string class.
//

//
//	Attempts to parse a date out of the given string.  Accepts a string such as "05/25/2010".
//	Returns;				The parsed date or nothing.
///
String.prototype.parseShortDate = function() {
	var date = new Date();
	date.setMonth(parseInt(this.substring(0, 2), 10) - 1);
	date.setDate(parseInt(this.substring(3, 5), 10));
	date.setFullYear(parseInt(this.substring(6), 10));
	return date;
};
