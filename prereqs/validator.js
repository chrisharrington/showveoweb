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

Showveo.Validator.addInheritance = function(implementer) {
	if (!Showveo.Validator.inheritance)
		Showveo.Validator.inheritance = new Array();
	Showveo.Validator.inheritance.push(implementer);
};

Showveo.Validator.validateInheritance = function() {
	if (!Showveo.Validator.inheritance)
		return;
	$(Showveo.Validator.inheritance).each(function(index, handler) {
		handler();
	})
};