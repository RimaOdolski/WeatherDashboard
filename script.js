//Get User Input 
var apiKey = "&appid=e36f2d6c975711e1482f564fe7b024f2";
//var cityName = $("searchBar").val();
//var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey ;


$("#searchBtn").on("click", function() {
    $('#fivedaycast').addClass('show');
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey ;
    var cityName = $("#searchBar").val();
  
        //$("#searchBar").val("");  
  
    $.ajax({
      url: apiUrl,
      method: "GET"
    })
    .then(function (response){
       
  
     }); 
});

function currentConditions (response) {

//temp in Fernheit 
 var tempConvert=  ((response.main.temp - 273.15) * 1.80) + 32;


 var city = $("<h4>").addClass("card-title").text (response.name);
 var date = $("<h4>").addClass("card-title").text (date.toLocaleDateString('en-US'));
 var temperature = $("<p>"). addClass("card-body").text (response.main.temp);
 var humidity = $("<p>"). addClass("card-body").text (response.main.humidity);
 var windSpeed = $("<p>"). addClass("card-body").text (response.wind.speed + "MPH");
 var weatherIcon = $("img"). attr ("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
}