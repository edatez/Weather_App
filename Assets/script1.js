var citiesStore = JSON.parse(localStorage.getItem("weatherByCity"));

if (!citiesStore){
    citiesStore = {};
}
citiesStore["sacramento"] = ""
console.log(citiesStore)
localStorage.setItem("weatherByCity", JSON.stringify(citiesStore))

function renderCityData(cityName){
    console.log(cityName);
    var cityData = getCityData(cityName);
    if(!cityData){
        console.log("no data in local storage");
        return;
    }
    console.log("got data from local storage");
    var renderCityName = $("<h1>"+cityData.name+"</h1>");
    $(".city-name").append(renderCityName);
  
        for(key in citiesStore){
          let liCity = `<li>${key}</li>`
          $("#history").append(liCity)
        }
      
}

function (cityName){
    if(citiesStore[cityName]){
        return citiesStore[cityName];
    }else{
        fetchCityData(cityName);
        return false;
    }
}

function fetchCityData(cityName){
    var queryUrl = "api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey;
    var apiKey = "9fc203891252cc2336158c490f709da2";
    var cityName = "";

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function(response){
        console.log(response);
        citiesStore;
        renderCityData(cityName);
    });
}



renderCityData("Big Bear Lake, CA");