//Get User Input 
var apiKey = "&appid=e36f2d6c975711e1482f564fe7b024f2";
//var cityName = $("searchBar").val();
//var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey ;


$("#searchBtn").on("click", function() {
    var cityName = $("#searchBar").val();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey ;
   console.log(cityName);
    //API CALL 

    $.ajax({
        url: apiUrl,
        method: "GET"
      })
      .then(function (response){
          console.log(response);
          console.log(response.main.humidity);
          console.log(response.wind.speed);
          console.log(response.main.temp);
          
          currentConditions(response);
      }); 
    function currentConditions (response) {
        
        //temp in Fernheit 
         var tempConvert=  ((response.main.temp - 273.15) * 1.80) + 32;
        
         var  main = $("<div>").addClass("card-body");
         var city = $("<h4>").addClass("card-title").text ("response.name");
         //var date = $("<h4>").addClass("card-title").text (date.toLocaleDateString('en-US'));
         var temperature = $("<p>"). addClass("card-body").text ("Temperature: " + tempConvert + "℉");
         var humidity = $("<p>"). addClass("card-body").text ("Humidity: " + response.main.humidity + "%");
         var windSpeed = $("<p>"). addClass("card-body").text (response.wind.speed + "MPH");
         var weatherIcon = $("img"). attr ("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        
         // APPEND TO DOM 
         city.append(date,weatherIcon);
         main.append(temperature, humidity, windSpeed);
         $("#currentCity").append (main);
    }

});

