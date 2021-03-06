"use strict";

// jQuery request
(function() {
	var url = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia";
	var apiKey = "fb3624d6f94d6533d8e593cf2a3fe40a"; // "APIKEY"

	$.get(url + '&appid=' + apiKey).done(function(response) {
//		console.log(response);
		updateUISuccess(response);
	}).fail(function(error) {
		console.log(error);
		updateUIError();
	});

	// handle XHR success
	function updateUISuccess(response) {
		var degC = response.main.temp - 273.15;
		var degF = degC * 1.8 + 32;
		var state = {
			condition: response.weather[0].main,
			degCInt: Math.floor(degC),
			degFInt: Math.floor(degF)
		};
		var into = document.querySelector('#weather');
		ReactDOM.render(<Forecast {...state} />, into);

		function Forecast(props) {
			return (
				<span>
					{props.degCInt}&#176; C / {props.degFInt}&#176; F
					{props.condition}
				</span>
			)
		}
	}

	// handle XHR error
	function updateUIError() {
//		var weatherBox = document.getElementById("weather");
//		weatherBox.className = "hidden";
		var $weatherBox = $('#weather');
		$weatherBox.addClass('hidden');
	}
})();

// Fetch request

(function() {
	var url = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia";
	var apiKey = "fb3624d6f94d6533d8e593cf2a3fe40a"; // Api Key

	fetch(url + '&appid=' + apiKey).then(function(response) {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return(response.json());
	}).then(function(response) {
		updateUISuccess(response);
	}).catch(function() {
		updateUIError();
	});

	// handle XHR success
	function updateUISuccess(response) {
		var condition = response.weather[0].main;
		var degC = response.main.temp - 273.15;
		var degCInt = Math.floor(degC);
		var degF = degC * 1.8 + 32;
		var degFInt = Math.floor(degF);
		var weatherBox = document.getElementById("weather");
		weatherBox.innerHTML = "<p>" + degCInt + "&#176; C / " + degFInt + "&#176; F</p><p>" + condition + "</p>";
	}

	// handle XHR error
	function updateUIError() {
		var weatherBox = document.getElementById("weather");
		weatherBox.className = "hidden";
	}
})();


// XHR request

(function() {
	var url = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia";
	var apiKey = "fb3624d6f94d6533d8e593cf2a3fe40a"; // Replace "APIKEY"
	var httpRequest;

	makeRequest();

	// create and send an XHR request
	function makeRequest() {
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = responseMethod;
		httpRequest.open('GET', url + '&appid=' + apiKey);
		httpRequest.send();
	}
	// handle XHR response
	function responseMethod() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				updateUISuccess(httpRequest.responseText);
			} else {
				updateUIError();
			}
		}
	}
	// handle XHR success
	function updateUISuccess(responseText) {
		var response = JSON.parse(httpRequest.responseText);
		var condition = response.weather[0].main;
		var degC = response.main.temp - 273.15;
		var degCInt = Math.floor(degC);
		var degF = degC * 1.8 + 32;
		var degFInt = Math.floor(degF);
		var weatherBox = document.getElementById("weather");
		weatherBox.innerHTML = "<p>" + degCInt + "&#176; C / " + degFInt + "&#176; F</p><p>" + condition + "</p>";
	}
	// handle XHR error
	function updateUIError() {
		var weatherBox = document.getElementById("weather");
		weatherBox.className = "hidden";
	}
})();
