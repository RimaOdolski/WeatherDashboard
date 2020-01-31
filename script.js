 var apiKey = "&appid=e36f2d6c975711e1482f564fe7b024f2";
//var apiKey = "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c";
var now = moment().format('dddd D MMMM YYYY ');
//var cityName = $("#searchBar").val().trim();
//var queryForecast= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey;

$("#searchBtn").on("click",function() {

  function currentConditions() {
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
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lon, lat);
        $('#currentCity').empty();
        //console.log(response);
        // temp in Fahrenheit
         var tempConvert=  Math.floor((response.main.temp - 273.15) * 1.80) + 32; 
         var card = $("<div>").addClass("card");
         var main = $("<div>").addClass("card-body");
          //create html elements to display weather info (city, date, windspeed,temp,uv)
         var city = $("<h4>").addClass("card-title").text(response.name);
         var date = $("<span>").addClass("card-title").text(" " + moment(response.dt, "X").format("MM/DD/YYYY"))
         var temperature = $("<p>").addClass("card-body").text("Temperature: " + tempConvert + "℉");
         var humidity = $("<p>").addClass("card-body").text("Humidity: " + response.main.humidity + "%");
         var windSpeed = $("<p>").addClass("card-body").text ("Wind Speed: "+ response.wind.speed + "MPH");
         var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        
         // APPEND TO DOM 
         city.append(icon, date);
         //main.append(city, temperature, humidity, windSpeed);
         card.append(main);
         console.log()
         $("#currentCity").append(card);
  

         getUv(); 

         function getUv () {
          queryURL = "https://api.openweathermap.org/data/2.5/uvi?" + apiKey + "&lat=" + lat + "&lon=" + lon;
          $.ajax( {
            url: queryURL,
            method: "GET",
            })
            .then(function(response) {
              console.log(response);
            var uvIndex = response.value;
            var uvColor = "";
  
            if(uvIndex < 3){ uvColor = "green";}
            else if(uvIndex < 6){ uvColor = "yellow";}
            else if(uvIndex < 8){ uvColor = "orange";}
            else if(uvIndex < 11){ uvColor = "red";}
            else{ uvColor = "violet";}
            var currentUv =$("<p>").text("UV: " + uvIndex).addClass("card-body").attr("style", "background-color:" + uvColor).attr("id","uvinfo");
           main.append(city, temperature, humidity, windSpeed,currentUv);

          })
        }
    
          

        }); 
    }
      



  $("#fivedaycast").addClass("show");
  console.log("This was a click.");
  // Display 5 day forecast 
  function forecast () {
    var cityName = $("#searchBar").val().trim();
    var queryForecast= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey;
    //console.log("This function was called.");

    $.ajax({
      url: queryForecast,
      method: "GET"
    })
    .then(function (response){
      //console.log(response);
      $('#forecast').empty();

      for(var i = 0; i < 5; i++){
        timeIndex = i * 8 + 7;
        var forecastDate = response.list[timeIndex].dt_txt.slice(0, 10);
        console.log(forecastDate);
        var forecastTemp = Math.floor((response.list[i].main.temp - 273.15) * 1.8) +32 ;
        console.log(forecastTemp);
        var forecastHumidity = response.list[i].main.humidity;
        console.log(forecastHumidity);
        var icon = response.list[i].weather[0].icon;
         console.log(icon);
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

        // create HTML elements to display above info for 5 day forecast 

        var cardContent = "<div class='col-sm-2 cardDay'><p class='dateForecast'>" + forecastDate + "</p><p>" + '<img src="' + iconUrl + '" />' +"</p><p>" + "Temp: " +forecastTemp + '℉' +"</p><p>" +'Humidity: ' +forecastHumidity +'%' +"</p></div>";
        $("#forecast").append(cardContent);
        

      }
    })

  } 

  currentConditions ();
  forecast();

});
   


      







 



