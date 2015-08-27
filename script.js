var myAPPID = "05737ea7cc175cbdd78958363d908da9";

var getLocationInfo = function(){
	var locationInfo = {};
	$.ajax({
		url: "http://ipinfo.io/",
		data: "json",
		dataType: "json",
		async: false,
		success: function(data){
			console.log(data);
			locationInfo.country = data.country
			locationInfo.latitude = data.loc.split(",")[0];
			locationInfo.longitude = data.loc.split(",")[1];
		}
	});
	return locationInfo;
}

var getWeather = function(locationInfo){
	openWeatherMapRequestURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + locationInfo.latitude + "&lon=" + locationInfo.longitude + "&APPID=" + myAPPID;
	console.log(openWeatherMapRequestURL)
	var weather;
	$.ajax({
		url: openWeatherMapRequestURL,
		dataType: "json",
		data: "&units=metric",
		async: false,
		success: function(data){
			weather = data;
		}
	});
	return weather;
}

var weatherImages = {
	Clouds: "https://picjumbo.imgix.net/HNCK7685.jpg?q=40&w=1650&sharp=30",
	Thunderstorm: "http://i.imgur.com/61W4Hnd.jpg",
	Drizzle: "http://i.imgur.com/RZNOig1.jpg",
	Rain: "https://picjumbo.imgix.net/HNCK1745.jpg?q=40&w=1650&sharp=30",
	Snow: "https://picjumbo.imgix.net/IMG_4795.jpg?q=40&w=1650&sharp=30",
	Athmosphere: "http://ppcdn.500px.org/53461606/a74f3401b37f3e71797067f16a4ad047e60ed99e/2048.jpg",
	Clouds: "http://i.imgur.com/xLG8HF7.jpg",
	Extreme: "http://upload.wikimedia.org/wikipedia/commons/a/aa/Jojo-Maly_Szyszak_2005.jpg",
	Additional: "http://i.imgur.com/2LauP.jpg"
}

var weatherIcons = {
	Clouds: "wi-cloudy",
	Thunderstorm: "wi-day-thunderstorm",
	Drizzle: "wi-day-showers",
	Rain: "wi-day-rain-mix",
	Snow: "wi-snowflake-cold",
	Athmosphere: "wi-smog",
	Extreme: "wi-meteor",
	Additional: "wi-alien"
}


$(document).ready(function(){
	var locationInfo = getLocationInfo();
	$(".country").html(locationInfo.country);
	var weather = getWeather(locationInfo)

	$(".weather-temperature").html(weather.name)
	$(".temperature").html('<i class="wi ' + weatherIcons[weather.weather[0].main] + '"></i> ' + weather.main.temp + '<i class="wi wi-celsius"></i>')
	$(".weather-description").html(weather.weather[0].description)
	$('<style>body { background: url(\'' + weatherImages[weather.weather[0].main] + '\') no-repeat center center fixed; background-size: cover;}</style>').appendTo('body');
	
	console.log(weather);
});