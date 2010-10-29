//
//     A plugin providing clear textbox functionality to the matched elements.
//
(function ($) {
        var color = "#777";

        $.fn.extend({
                clearbox: function (method) {
                        return this.each(function () {
                                var input = $(this);
                                if (method && method == "reset")
                                        input.val(input.attr("name")).css("color", color);
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
                                                        var textbox = input;
                                                        if (textbox.val() == textbox.attr("name"))
                                                                textbox.val("").css("color", "Black");
                                                }).blur(function () {
                                                        var textbox = input;
                                                        if (textbox.val() == "")
                                                                textbox.val(textbox.attr("name")).css("color", color);
                                                });
                                        }
                                }
                        });
                }
        });
})(jQuery);