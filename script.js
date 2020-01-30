var apiKey = "&appid=e36f2d6c975711e1482f564fe7b024f2";
var date = new Date();
var cityName = $("#searchBar").val().trim();

/*$("#searchBar").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
}); */

$("#searchBtn").on("click",function() {

   // Gets the value of input
  var cityName = $("#searchBar").val().trim();




    // URL for API call
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;
    
    //API CALL 
    $.ajax({
        url: apiUrl,
        method: "GET"
      })
    .then(function (response){
      $('#currentCity').empty();

      // temp in Fahrenheit
       var tempConvert=  Math.floor((response.main.temp - 273.15) * 1.80) + 32;
       var card = $("<div>").addClass("card");
       var main = $("<div>").addClass("card-body");
        //create html elements to display weather info (city, date, windspeed,temp,uv)
       var city = $("<h4>").addClass("card-title").text(response.name);
       //var date = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
       var temperature = $("<p>").addClass("card-body").text("Temperature: " + tempConvert + "℉");
       var humidity = $("<p>").addClass("card-body").text("Humidity: " + response.main.humidity + "%");
       var windSpeed = $("<p>").addClass("card-body").text ("Wind Speed: "+ response.wind.speed + "MPH");
       var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
      
      // get the UV Index 
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
      $.ajax( {
        url: queryURL,
        method: "GET",
        })
    .then(function(response) {
        var uvIndex = response.value;
        var uvColor = "";
        //var currentUv =$("<p>").text("UV Index: " + uvIndex).attr("style", "background-color: " + uvColor);
        if(uvIndex < 3){ uvColor = "green";}
        else if(uvIndex < 6){ uvColor = "yellow";}
        else if(uvIndex < 8){ uvColor = "orange";}
        else if(uvIndex < 11){ uvColor = "red";}
        else{ uvColor = "violet";}
        $("<p>").text("UV Index: " + uvIndex).attr("style", "background-color: " + uvColor);
         
    });
       // APPEND TO DOM 
       city.append(icon);
       main.append(city, temperature, humidity, windSpeed);
       card.append(main);
       console.log()
       $("#currentCity").append(card);
  });
});




