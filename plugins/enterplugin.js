
//
//	A plugin providing enter keypress event capture functionality.
//
(function ($) {
	$.fn.extend({
		enter: function (handler) {
			return this.each(function () {
				$(this).keyup(function (e) {
					if ((e.keyCode || e.which) == 13 && handler)
						handler();
				});
			});
		}
	});
})(jQuery);

