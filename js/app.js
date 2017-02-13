let icons = ['fa-sun','fa-thermometer-full', 'fa-snowflake-o','fa-cloud', 'fa-bolt', 'fa-moon-o'];
let weather = ['snow','sunny', 'rain', 'cloudy', 'night', 'sunset', 'sunrise'];

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
      let html = '<h1 id="city-region">'+weather.city+', '+weather.region+'</h1>';
      html += '<h1 id="temps">'+ weather.temp +'&deg;'+ weather.units.temp + ', ' + weather.alt.temp +'&deg;C</h1>';
      html += '<h1 id="condition">'+weather.currently+'</h1>';
      
      getSymbols(weather.currently);
      $("#location").html(html);
      // $('#icons').html(getSymbols(weather.currently));
      
      // $('#icons').show();
    },
    error: function(error) {
      $("#location").html('<p>'+error+'</p>');
    }
  });
}


function getSymbols(condition){
	condition = condition.split(' ').filter(function(word){
		return word != 'and';
	});
	if(condition.indexOf('Snow') != -1){
		$('html').css('background-image', 'url(images/snow.jpeg)');
		$('.container-fluid').css('background-image', 'url(images/snow.jpeg)');
	}	   
	else{ //if(condition.indexOf('Sunny') != -1){
		$('html').css('background-image', 'url(images/sunny.jpeg)');
		$('.container-fluid').css('background-image', 'url(images/sunny.jpeg)');
	}
	// if(condition.indexOf('snow') != -1){
	 	//return '<i class="fa fa-snowflake-o fa-4x" aria-hidden="true"></i>';
	// }
}


