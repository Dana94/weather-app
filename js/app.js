let icons = ['fa-sun-o', 'fa-moon-o', 'fa-cloud', 'fa-bolt', 'fa-snowflake-o'];
let images = ['sunrise', 'sunset', 'night', 'cloud', 'rain', 'sunny', 'snow'];

let myWeather = {
	city: "",
	region: "",
	temp_F: "",
	temp_C: "",
	condition: "",
	sunrise: "",
	sunset: ""
};

$('#icons').hide();

//Source: https://www.freecodecamp.com/challenges/get-geolocation-data
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      loadWeather(position.coords.latitude+','+position.coords.longitude, '');
    })
  }

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      
      myWeather.condition = weather.currently.toLowerCase();
      myWeather.city = weather.city,
	  myWeather.region = weather.region,
	  myWeather.temp_F = weather.temp,
	  myWeather.temp_C = weather.alt.temp;
	  myWeather.sunrise = weather.sunrise;
	  myWeather.sunset = weather.sunset;

	  //console.log(myWeather.sunrise + " " + myWeather.sunset);

      let html = '<h1 id="city-region">'+weather.city+', '+weather.region+'</h1>';
      html += '<h1 id="temps">'+ weather.temp +'&deg;'+ weather.units.temp + ', ' + weather.alt.temp +'&deg;C</h1>';
      html += '<h1 id="condition">'+weather.currently+'</h1>';
      
      displaySymbols();
      $("#location").html(html);
    },
    error: function(error) {
      $("#location").html('<p>'+error+'</p>');
    }
  });
}

let iconsPlace = document.getElementsByTagName('i');

function displaySymbols(){
	//weather icons and images
	if(/sunny/gi.test(myWeather.condition)){	
			$(iconsPlace[0]).addClass('fa-sun-o');
			$('html').css('background-image', 'url(images/sunny.jpeg)');
	     	$('.container-fluid').css('background-image', 'url(images/sunny.jpeg)');
	}
	else if (/cloudy/gi.test(myWeather.condition)){
			$(iconsPlace[0]).addClass('fa-cloud');
			$('html').css('background-image', 'url(images/cloud.jpeg)');
	     	$('.container-fluid').css('background-image', 'url(images/cloud.jpeg)');
	}	
	else if (/rain|shower/gi.test(myWeather.condition)){
			$(iconsPlace[0]).addClass('fa-cloud');
			$('html').css('background-image', 'url(images/rainy.jpeg)');
	     	$('.container-fluid').css('background-image', 'url(images/rainy.jpeg)');
	}	
	else if (/snow/gi.test(myWeather.condition)){
			$(iconsPlace[0]).addClass('fa-snowflake-o');
			$('html').css('background-image', 'url(images/snow.jpeg)');
	     	$('.container-fluid').css('background-image', 'url(images/snow.jpeg)');
	}	
	else if (/thunder/gi.test(myWeather.condition)){
			$(iconsPlace[0]).addClass('fa-bolt');
			$('html').css('background-image', 'url(images/night-thunder.jpeg)');
	     	$('.container-fluid').css('background-image', 'url(images/night-thunder.jpeg)');
	}	

	//thermometer icons
	if(myWeather.temp_F >= 102){
		$(iconsPlace[1]).addClass('fa-thermometer-full');
	}
	else if(myWeather.temp_F >= 63){
		$(iconsPlace[1]).addClass('fa-thermometer-three-quarters');
	}
	else if(myWeather.temp_F >= 42){
		$(iconsPlace[1]).addClass('fa-thermometer-half');
	}
	else if(myWeather.temp_F >= 21){
		$(iconsPlace[1]).addClass('fa-thermometer-quarter');
	}
	else{
		$(iconsPlace[1]).addClass('fa-thermometer-empty');
	}

	$('#icons').show();

	let sunrisePlus5 = new Date();
	

	//console.log('+5 rise ', sunrisePlus5);

	let sunsetPlus5 = new Date();
	//sunsetPlus5.setMinutes(myWeather.sunset + 5);

	//console.log('+5 set ', sunsetPlus5);

	let currentTime = new Date();
	
	let currentTimeMinus20 = currentTime;
	currentTimeMinus20.setMinutes(currentTime.getMinutes() - 20);

		
		// console.log('-20 min ', currentTimeMinus20);
		// console.log('-20 min ', currentTimeMinus20.toLocaleTimeString());

	currentTime = new Date();
	
	let currentTimePlus20 = currentTime;
	currentTimePlus20.setMinutes(currentTime.getMinutes() + 20);

		
		// console.log('+20 min ', currentTimePlus20);
		// console.log('+20 min ', currentTimePlus20.toLocaleTimeString());	
		

		// //true
		// console.log('am? ', /am/ig.test(currentTimeMinus20.toLocaleTimeString()));
		// //true
		// console.log('>= sunrise? ', currentTimeMinus20.toLocaleTimeString() >= myWeather.sunrise);
		// //true
		// console.log('<= sunrise? ', currentTimePlus20.toLocaleTimeString() <= myWeather.sunrise);

	//determining what time of day and if it is during a sunrise or sunset
	//I gave the length of a typical sunrise or sunset to last about 5 minutes
	// if(/am/ig.test(currentTimeMinus20.toLocaleTimeString()) && currentTimeMinus20.toLocaleTimeString() <= myWeather.sunrise && currentTimePlus20.toLocaleTimeString() >= myWeather.sunrise){
	// 	console.log('here');
	// 	$('html').css('background-image', 'url(images/sunrise.jpeg)');
	//     $('.container-fluid').css('background-image', 'url(images/sunrise.jpeg)');
	// }
	// else if(/pm/ig.test(currentTimeMinus20.toLocaleTimeString()) && currentTimeMinus20.toLocaleTimeString() <= myWeather.sunset && currentTimePlus20.toLocaleTimeString() >= myWeather.sunset){
		
	// 	$('html').css('background-image', 'url(images/sunset.jpeg)');
	//     $('.container-fluid').css('background-image', 'url(images/sunset.jpeg)');
	// }
	// else if((/am/ig.test(currentTimePlus20.toLocaleTimeString()) && currentTimePlus20.toLocaleTimeString() < myWeather.sunrise) || 
	// 	    (/pm/ig.test(currentTimeMinus20.toLocaleTimeString()) && currentTimeMinus20.toLocaleTimeString() > myWeather.sunset)){
	// 		console.log('only here');
	// 		$('html').css('background-image', 'url(images/night-clear.jpeg)');
	//         $('.container-fluid').css('background-image', 'url(images/night-clear.jpeg)');
	// }		
}