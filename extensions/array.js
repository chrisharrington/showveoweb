//
//	Extension methods for the array object.
//

//
//	Creates a comma separated list.
//
Array.prototype.toCommaString = function() {
	var string = "";
	$(this).each(function(index, item) {
		string += ", " + item;
	});
	return string.substring(2);
};