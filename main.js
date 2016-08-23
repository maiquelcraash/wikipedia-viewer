/**
 * Created by maiquel on 15/08/16.
 */

(function () {
	"use strict";
	$(document).ready(function () {
		$('.search-wrapper button, .search-wrapper span').click(searchToggle);
		$('.search-wrapper .search-input').keypress(function (event) {
			if (event.which == 13 || event.keyCode == 13) {
				searchToggle(event);
			}
		});
		// $('.search-icon')
	});


	function searchToggle(evt) {
		var container = $(evt.target).closest('.search-wrapper');

		if (!container.hasClass('active')) {
			container.addClass('active');
			evt.preventDefault();
		}

		//valida se já está aberto já o campo (active) e se o elemento clicado é o "X"
		else if (container.hasClass('active') && $(evt.target).hasClass('close')) {
			container.removeClass('active');
			// clear input
			container.find('.search-input').val('');
			// clear and hide result container when we press close
			container.find('.result-container').fadeOut(100, function () {
				$(this).empty();
			});

			clearResults();

			if (container.hasClass('top')) {
				container.removeClass('top', 700, "easeInOutQuart");
			}
		}
		else {// (container.hasClass('active') && $(this).closest('.input-holder').length > 0) {
			var inputField = container.find('.search-input');
			var searchString = inputField.val().trim().toLowerCase();

			if (searchString) {
				container.find('.search-input').focus();

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
		clearResults();
		var results = parseData(data);
		var container = $('.media');
		container.css({"opacity": 0, "top": "100px"});

		onAnimationFinished(function () {
			results.forEach(function (element) {
				var _body = $('<div class="body">');
				var _heading = $('<div class="heading"> <a target="_blank" href="' + element.link + '">' + element.head + '</a></div>');
				var _description = $('<div class="description">' + element.description + '</div>');
				$(_body).append(_heading).append(_description);
				$(container).append(_body);
			});

			container.animate({opacity: 1, top: 0}, 300);
		});


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

	function parseData(data) {
		var resultArray = [];

		function Result(head, description, link) {
			this.head = head;
			this.description = description;
			this.link = link;
		}

		for (var i = 0; i < data[1].length; i++) {
			var head = data[1][i];
			var description = data[2][i];
			var link = data[3][i];

			var result = new Result(head, description, link);
			resultArray.push(result);
		}

		return resultArray;
	}

	function clearResults() {
		var container = $('.media');
		container.animate({opacity: 0, top: "100px"}, 300, function () {
			container.html("");
		});

	}

}());

