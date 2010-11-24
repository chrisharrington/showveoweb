//
//	A collection of date extension methods.
//

//
//	Returns a flag indicating whether or not the referenced date is today.
//	Returns:				The today flag.
//
Date.prototype.isToday = function() {
	var today = new Date();
	return today.getFullYear() == this.getFullYear() && today.getMonth() == this.getMonth() && today.getDate() == this.getDate();
};

//
//	Derives the number of days away the referenced date is from today.  If the date is in the past, a negative number is returned.
//	Returns:				The number of days the referenced date is away from today.
//
Date.prototype.difference = function() {
	var first = new Date().getTime();
	var second = this.getTime();

	return Math.round((second - first) / 1000 / 60 / 60 / 24);
};

//
//	Derives a string (which is in turn derived from the difference) representative of the date.
//	Returns:				A human-readable date string.
//
Date.prototype.differenceString = function() {
	var difference = this.difference();
	if (difference == 3)
		return "in three days";
	if (difference == 2)
		return "in two days";
	if (difference == 1)
		return "tomorrow";
	if (difference == 0)
		return "today";
	if (difference == -1)
		return "yesterday";
	if (difference == -2)
		return "two days ago";
	if (difference == -3)
		return "three days ago";

	var month = this.getMonth()+1;
	if (parseInt(month) < 10)
		month = "0" + month;
	var date = this.getDate();
	if (parseInt(date) < 10)
		date = "0" + date;
	var year = this.getFullYear();
	return "on " + month + "/" + date + "/" + year;
};