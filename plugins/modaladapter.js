//
//	A plugin providing modal wrapping functionality to the matched elements.
//
(function ($) {
	$.fn.extend({
		modal: function (method) {
			return this.each(function () {

				//--------------------------------------------------------------------------------------------------------------
				/* Data Members */

				//	The modal wrapper.
				var _wrapper;

				//	The focus panel.
				var _focus;

				//	The width of the modal dialog.
				var _width;

				//--------------------------------------------------------------------------------------------------------------
				/* Constructors */

				//
				//	The default constructor.
				//	panel:							The panel to wrap with modal dialog functionality.
				//	method:							The method for the control.
				//
				var initialize = function (parameters) {
					_focus = $("div.focus");

					if (!_wrapper)
						_wrapper = parameters.panel.parent();
					if (!_width)
						_width = deriveWidth(parameters.panel);

					var method = parameters.method;
					if (!method)
						wrap(parameters.panel);
					else if (method == "show")
						show();
					else if (method == "hide")
						hide();
				};

				//--------------------------------------------------------------------------------------------------------------
				/* Private Methods */

				//
				//	Shows the modal dialog.
				//
				var show = function () {
					setModalPosition();

					_wrapper.show();

					_focus.height($(document).height()).show();
				};

				//
				//	Hides the modal dialog.
				//
				var hide = function () {
					_focus.hide();
					_wrapper.hide();
				};

				//
				//	Derives the width from the given panel.
				//	panel:						The panel containing the css width rule.
				//	Returns:					The derived width.
				//
				var deriveWidth = function (panel) {
					var width = panel.outerWidth();
					return width == 0 ? 500 : width;
				};

				//
				//	Wraps the given panel with modal dialog functionality.
				//	panel:						The panel to wrap.
				//
				var wrap = function (panel) {
					var wrapper = $("<div></div>").addClass("modal");

					var parent = panel.parent();
					wrapper.append(panel.css("display", "inline"));
					parent.append(wrapper);
					_wrapper = panel.parent();

					setModalPosition();
				};

				//
				//	Sets the position of the modal to the center of the screen.
				//
				var setModalPosition = function () {
					var left = ($(window).width() - _wrapper.outerWidth()) / 2;
					var top = ($(document).scrollTop() + 100);

					_wrapper.css({ left: left + "px", top: top + "px" });
					_focus.height($(document).height());
				};

				initialize({
					panel: $(this),
					method: method
				});
			});
		}
	});

})(jQuery);

