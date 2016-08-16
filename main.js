/**
 * Created by maiquel on 15/08/16.
 */

(function () {
	"use strict";
	$(document).ready(function () {
		$('.search-wrapper button, .search-wrapper span').click(searchToggle);
	});


	function searchToggle(evt) {
		var container = $(this).closest('.search-wrapper');

		if (!container.hasClass('active')) {
			container.addClass('active');
			evt.preventDefault();
		}
		else if (container.hasClass('active') && $(this).closest('.input-holder').length == 0) {
			container.removeClass('active');
			// clear input
			container.find('.search-input').val('');
			// clear and hide result container when we press close
			container.find('.result-container').fadeOut(100, function () {
				$(this).empty();
			});
		}
	}
}());