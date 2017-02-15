let icons = ['fa-sun','fa-thermometer-full', 'fa-thermometer-half', 'fa-snowflake-o', 'fa-cloud', 'fa-bolt', 'fa-moon-o'];
let images = ['sunrise', 'sunset', 'night', 'cloud', 'rain', 'sunny', 'snow'];

let myWeather = {
	city: "",
	region: "",
	temp_F: "",
	temp_C: "",
	condition: ""
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
	     	$(iconsPlace[1]).addClass('fa-thermometer-half');
		}
	}
	
	// if(myWeather.condition.indexOf('Cloudy') != -1){
	// 	$('html').css('background-image', 'url(images/cloudy.jpeg)');
	// 	$('.container-fluid').css('background-image', 'url(images/cloudy.jpeg)');

	// 	$(iconsPlace[0]).addClass('fa-cloud');
	// }	   
	
	$('#icons').show();
	
}


