
//Source: https://www.freecodecamp.com/challenges/get-geolocation-data
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      $("#location").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    })
  }