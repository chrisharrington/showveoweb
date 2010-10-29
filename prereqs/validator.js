Showveo.Validator = {};
Showveo.Validator.validateNamespace = function (namespace) {
	var split = namespace.split(".");

	if (split[0] != "Showveo")
			return;

	var obj = Showveo;
	for (var i = 1; i < split.length; i++) {
			if (obj[split[i]] == undefined)
					obj[split[i]] = {};
			obj = obj[split[i]];
	}
};