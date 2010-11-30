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

				var interval;
				element.mouseenter(function() {
					interval = setTimeout(function() {
						tooltip.removeClass("left").removeClass("right").addClass(align).find("span").text(text);

						var position = element.position();
						position.top = position.top + $(element).height() + tooltip.outerHeight();
						if (align == "left")
							position.left += element.outerWidth()/2;
						else if (align == "right")
							position.left -= tooltip.outerWidth() - element.outerWidth()/2;
						

						tooltip.css(position);
						tooltip.fadeIn(200);
					}, 100);
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


