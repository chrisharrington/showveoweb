//
//     A plugin providing clear textbox functionality to the matched elements.
//
(function ($) {
	var color = "#777";

	$.fn.extend({
		clearbox: function (method) {
			if (method && method == "value") {
				var input = $(this);
				if (input.val() == input.attr("name"))
					return "";
				return input.val();
			}

			return this.each(function () {
				var input = $(this);
				if (method && method == "reset") {
					input.val(input.attr("name")).css("color", color);
					if (input.is("input[type='password']"))
						input.hide().next("input[type='text']").show();
				}
				else {
					if (input.is("input[type='password']")) {
						var textbox = $("<input type=\"text\" />").val(input.val()).show().css("color", color).focus(function () {
									textbox.hide();
									input.val("").show().focus();
							});
							input.hide().after(textbox).attr("name", input.val()).addClass("clearboxpassword").blur(function () {
									if (input.val() == "") {
											input.hide();
											textbox.val(input.attr("name")).show();
									}
							});
					}
					else {
							if (input.val() == "" && input.attr("name") != "")
									input.val(input.attr("name"));

							input.css("color", color).attr("name", input.val()).addClass("clearbox").focus(function () {
									if (input.val() == input.attr("name"))
											input.val("").css("color", "Black");
							}).blur(function () {
								if (input.val() == "")
									input.val(input.attr("name")).css("color", color);
							});
					}
				}
			});
		}
	});
})(jQuery);