$(document).ready(function(){  
  var long;
  var lat;
  var ktemp;
  var fTemp;
  var ctemp;

  $.ajax({
    url: 'https://freegeoip.net/json/?callback=?',
    dataType: 'jsonp',
    jsonpCallback: 'callback',
    success: function(data){
      //API URL with geolocation
      var api = 'https://api.openweathermap.org/data/2.5/weather?q=' + data.city + '&appid=894294019585b32a9a34427f5052f1ee';

      //JSON call for open weather
      $.getJSON(api, function(data){
        var weatherType = data.weather[0].description;
        ktemp = data.main.temp;
        var windSpeed = data.wind.speed + " mps";
        var city = data.name;
        var tempSwap= false;

        //Temperature in fahrenheit
        fTemp = Math.floor((ktemp)*(9/5)-459.67)

        //temperature in celsius
        ctemp = Math.floor(ktemp-273)

        $('#city').html("Weather in: " + city);
        $('#weatherType').html(weatherType);
        $('#fTemp').html(fTemp + " &#8457;");
        $('#windSpeed').html(windSpeed);
        $('#fTemp').on('click', function(){
          if(tempSwap ===false){
            $('#fTemp').html(ctemp + " &#8451;");
            tempSwap= true;
          } else {
            $('#fTemp').html(fTemp + " &#8457;");
            tempSwap = false;
          }
        });
        var body = $('body');
        switch (weatherType) {
            case 'clear sky': return body.addClass('clearSky');
            case 'scatteredClouds': return body.addClass('scateredClouds');
            case 'brokenClouds': return body.addClass('brokenClouds');
            case 'showerRain': return body.addClass('showerRain');
            case 'rain': return body.addClass('rain');
            case 'thunderstorm': return body.addClass('thunderstorm');
            case 'snow': return body.addClass('snow');
            case 'mist': return body.addClass('mist');
            default: body.addClass('clearSky')
          }
      });
    }
  });
});

