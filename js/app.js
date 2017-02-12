let icons = ['fa-sun','fa-thermometer-full', 'fa-snowflake-o','fa-cloud', 'fa-bolt', 'fa-moon-o'];
let weather = ['snow','sunny', 'rainy', 'cloudy', 'night', 'sunset-night'];

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
      
      
      $("#location").html(html);
      $('#icons').html('<i class="fa fa-snowflake-o fa-4x" aria-hidden="true"></i>');
      $('#icons').show();
    },
    error: function(error) {
      $("#location").html('<p>'+error+'</p>');
    }
  });
}


function getSymbols(){
	let condition = document.getElementById('condition').innerhtml.split(' ');
	console.log('hi');
	// if(condition.indexOf('snow') != -1){
	// 	return '<i class="fa fa-snowflake-o fa-4x" aria-hidden="true"></i>';
	// }
}


document.getElementById('location').addEventListener(onchange, getSymbols);