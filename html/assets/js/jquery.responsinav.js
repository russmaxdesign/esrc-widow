/*
 *
 * ResponsiNav Plugin
 * @author - Kent Safranski - http://www.fluidbyte.net
 *
 */
(function($) {
	$.fn.responsinav = function(o) {

		var o = jQuery.extend({
			breakpoint : 780,
			nav_container : 'nav',
			nav_element : 'ul',
			label : 'Site navigation',
			nav_container_other : '',
			nav_element_other : '',
			label_other : ''
		}, o);

		// 0 = Full, 1 = Mobile
		rn_mode = undefined;
		sub_nav_bind = false; /* init */

		// Bind to load and resize
		$(window).bind('load resize', function() {
			// Run mode by width
			if ($(window).width() <= o.breakpoint) {
				if (rn_mode == 0 || rn_mode == undefined) {
					nav.reset();
					nav.mobile();
				}
			} else {
				if (rn_mode == 1 || rn_mode == undefined) {
					nav.reset();
					nav.full();
				}
			}

		});

		nav = {
			reset : function() {
				$(o.nav_container).unbind('mouseenter mouseleave click');

			},

			full : function() {

				// Set mode
				rn_mode = 0;
				var curz = 0;
				// Ensure nav is visible, hide sub
				$(o.nav_container + ' ' + o.nav_element).show();
				$(o.nav_container_other + ' ' + o.nav_element_other).show();
			},

			mobile : function() {

				// Set mode
				rn_mode = 1;
				// Start nav hidden
				$(o.nav_container + ' ' + o.nav_element).hide();
				$(o.nav_container_other + ' ' + o.nav_element_other).hide();

				// Create mobile handle

				if ($(o.nav_container + ' > a.mobile_handle').length == 0) {
					$('<a class="mobile_handle">' + o.label + '</a>').appendTo(
							o.nav_container);
				}
				if ($(o.nav_container_other + ' > a.mobile_handle').length == 0) {
					$('<a class="mobile_handle">' + o.label_other + '</a>').appendTo(o.nav_container_other);
				}

				// Mobile handle toggle
				$(o.nav_container + ' > a.mobile_handle').unbind('click');
				if (o.nav_container_other) {
					$(o.nav_container_other + ' > a.mobile_handle').unbind('click');
					$(o.nav_container_other + ' > a.mobile_handle').click(function() {
								$(o.nav_container_other + ' > a.mobile_handle').toggleClass("down");
								$(o.nav_container_other + ' '+ o.nav_element_other).slideToggle(300);
							});

				}
				$(o.nav_container + ' > a.mobile_handle').click(
						function() {
							$(o.nav_container + ' > a.mobile_handle').toggleClass("down");
							$(o.nav_container + ' ' + o.nav_element).slideToggle(300);
						});

				// Arrows
				/*
				 * if ($('.sub_nav').length == 0) { $('nav ul
				 * li').each(function() { if ($(this).children('ul').length > 0) {
				 * $('<a class="sub_nav"><div class="arrow_down"></div></a>').appendTo(this); }
				 * }); }
				 */
			}
		};
	};
})(jQuery);