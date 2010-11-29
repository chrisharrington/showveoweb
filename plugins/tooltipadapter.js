//
//	A plugin providing a custom tooltip.
//
(function ($) {
	$.fn.extend({
        tooltip: function(align, refresh) {
			var tooltip = $("div.tooltip");
			if (align == "hide") {
				tooltip.fadeOut(200);
				return this;
			}
			
			if (!align)
				align = "left";
            return this.each(function() {
                var element = $(this);
                var text = element.attr("title");
				element.removeAttr("title");

				var getPosition = function(element) {
					var position = element.position();
					position.top = position.top + $(element).height() + 17;
					if (align == "left")
						position.left = position.left - 1;
					else if (align == "right")
						position.left = position.left - tooltip.width() + 14;
					return position;
				};

				var interval;
				element.mouseenter(function() {
					interval = setTimeout(function() {
						tooltip.removeClass("left").removeClass("right").addClass(align).find("span").text(text);
						tooltip.css(getPosition(element));
						tooltip.fadeIn(200);
					}, 500);
				}).mouseleave(function() {
					tooltip.fadeOut(200);
					if (interval)
						clearTimeout(interval);
					interval = undefined;
				});
            });
        }
	});
})(jQuery);


