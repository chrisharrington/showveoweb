//
//	A plugin providing a custom tooltip.
//
(function ($) {
	$.fn.extend({
        tooltip: function(align) {
			var tooltip = $("div.tooltip");
			if (!align)
				align = "left";
            return this.each(function() {
                var element = $(this);
                var text = element.attr("title");
				element.removeAttr("title");

				var interval;
				element.mouseenter(function() {
					interval = setTimeout(function() {
						tooltip.removeClass("left").removeClass("right").addClass(align).find("span").text(text);

						var position = element.position();
						position.top = position.top + $(element).height() + 17;
						if (align == "left")
							position.left = position.left - 1;
						else if (align == "right")
							position.left = position.left - tooltip.width() + 14;
						tooltip.css(position);
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


