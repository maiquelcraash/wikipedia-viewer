/**
 * Created by maiquel on 15/08/16.
 */

(function () {
	"use strict";
	$(document).ready(function () {
		$('.search-wrapper button, .search-wrapper span').click(searchToggle);
		// $('.search-icon')
	});


	function searchToggle(evt) {
		var container = $(this).closest('.search-wrapper');

		if (!container.hasClass('active')) {
			container.addClass('active');
			evt.preventDefault();
		}

		//valida se já está aberto já o campo (active) e se o elemento clicado é o "X"
		else if (container.hasClass('active') && $(this).closest('.input-holder').length == 0) {
			container.removeClass('active');
			// clear input
			container.find('.search-input').val('');
			// clear and hide result container when we press close
			container.find('.result-container').fadeOut(100, function () {
				$(this).empty();
			});

			if (container.hasClass('top')) {
				container.removeClass('top', 700, "easeInOutQuart");
			}
		}
		else if (container.hasClass('active') && $(this).closest('.input-holder').length > 0) {
			var inputField = container.find('.search-input');
			var searchString = inputField.val().trim().toLowerCase();

			if (searchString) {

				doSearch(searchString);

				// container.animate({top: "10%"},300, function () {});
				container.addClass('top', 700, "easeInOutQuart");
			}
		}
	}

	function doSearch(value) {
		$.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=5&namespace=0&format=json&search=" + value, RenderResults)
	}

	function RenderResults(data) {
		var container = $('.container');

		onAnimationFinished( function () {
			data[1].forEach( function (element) {
				$(container).append('<div>' + element + '</div>');
				console.log(element);
			});
		})
	}

	function onAnimationFinished(callback) {
		// Test if ANY/ALL page animations are currently active

		var testAnimationInterval = setInterval(function () {
			if (!$.timers.length) { // any page animations finished
				clearInterval(testAnimationInterval);
				callback();
			}
		}, 25);
	}

}());

