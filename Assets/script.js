var apiId = "e9885f935a30d807d367fb450e9d819f";
var currentDate = new Date().toLocaleDateString()
console.log(currentDate)

// read localstorage and build the list of the history 
var citiesStore = JSON.parse(localStorage.getItem('weatherByCity'));

if (!citiesStore) {
  citiesStore = {};
}

renderHistory()
// Fetch the City
// Display the City
// Getting weather for searched city. 

//  .attr("src", weatherImg)


function renderHistory() {
  $("#history").empty()
  for (key in citiesStore) {
    let liCity = `<div class="row"><button class="col-12 cityHistory btn">${key}</button></div>`
    $("#history").append(liCity)
  }
  $(".cityHistory").on("click", function () {
    console.log(this)
    searchCity($(this).text())
  })
}

function searchCity(city) {

  /// current weather
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=imperial`
  console.log(queryURL)

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    //       for uv:  https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&
    // exclude=hourly,daily&appid={YOUR API KEY}
    //Display the UV data


    //  function render and another ajax for 
    https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid={YOUR API KEY}

    // building the card with the info and appending it to that area.
    var card = `<div class="card" style="width: 18rem;">
       <div class="card-body">
         <h5 class="card-title">${city}</h5>
 
         <p class="card-text">Temperature: ${response.main.temp}°F</p>
         <p class="card-text">Humidity: ${response.main.humidity}%</p>  
         <p class="card-text">Wind Speed: ${response.wind.speed}mph</p>
         <p class="card-text">UV Index:${response.wind.speed} mph</p>

      
       </div>
     </div>`
    $("#current").empty()
    $("#current").append(card);
    forecast(city)
  });
}
// If you split first with space. The first part of the array will be the day. Then you split the first part with ‘-‘ Then you can get every piece and create a string with the format you want
// Server Interaction -getting 5day forecast for the city entered.
// // //  ToDos: eliminate the year at the forecast, for temps-change kelvin to F.Add a sun icon.
// if you put :  &units=imperial in the query url the units will be in imperial units and you won't have to run a kelvin to imperial calculation

function forecast(city) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiId}&units=imperial`
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // // //  ToDos: add the icons, uvi
    // if you put :  &units=imperial in the query url the units will be in imperial units and you won't have to run a kelvin to imperial calculation

    $("#forecast").empty();
    for (var i = 0; i < response.list.length; i++) {
      let day = response.list[i]
      if (day.dt_txt.includes("12:00:00")) {
        // showing the info in the forcecast area-picking here one of them because it gives couple other choices with different times, so I picked 12:00
        //looping and creating 5 cards
        var card = `<div class="card col" style="width: 18rem;">
     <div class="card-body"  id="forecast">
       <h5 class="card-title">${day.dt_txt.split()[0]}</h5>
       <h6 class="card-subtitle mb-2 text-muted">${day.dt_txt.split("")[0]}</h6>
       <p class="card-text">Temp:${day.main.temp}°F</p>
       <p class="card-text">Humidity: ${day.main.humidity}%</p> 
     </div>
   </div>`
        $("#forecast").append(card);
      }
    }
  });
}

$("#search").on("click", function () {
  event.preventDefault();
  var city = $("#city").val();
  console.log("clicked: ", city, citiesStore[city])
  // save history on the localstorage
  if (!citiesStore[city]) {
    citiesStore[city] = "a"
    localStorage.setItem("weatherByCity", JSON.stringify(citiesStore))
    renderHistory()
  }
  searchCity(city);
});
