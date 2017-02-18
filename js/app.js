let icons = ['fa-sun', 'fa-moon-o', 'fa-cloud', 'fa-bolt', 'fa-snowflake-o'];
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
	for(let i = 0; i < images.length; i++){
		if (myWeather.condition.indexOf(images[i]) != -1){
			$('html').css('background-image', 'url(images/'+images[i]+'.jpeg)');
	     	$('.container-fluid').css('background-image', 'url(images/'+images[i]+'.jpeg)');

	     	$(iconsPlace[0]).addClass('fa-'+images[i]);
	     	
		}
	}

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

	let currentTime = new Date();//.toLocaleTimeString();
	//let sunrisePlus20Min = myWeather.sunrise.
	//if()

	//works vv
	console.log(currentTime.toLocaleTimeString());
	currentTime.setMinutes(currentTime.getMinutes() + 20);
	console.log(currentTime.toLocaleTimeString());
	
	
	//doesn't work vv
	// let sunriseTime = new Date();
	// myWeather.sunrise.setMinutes(myWeather.sunrise.getMinutes() + 20);
	// console.log(myWeather.sunrise);
	
}


