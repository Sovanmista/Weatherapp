function getweather(){
  const ApiKey = '6878be985439497d77b8528dc9736fae';
  const city = document.getElementById('city').value;
  if (!city){
    alert('Please enter a city');
    return;
  }
  const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
  const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}`;
  
  fetch(currentWeather)
    .then(response => response.json())
    .then(data => {
      displayweather(data);
    })
    .catch(error => {
      console.error(error);
      alert("Please try again after some time!");
    });
    
  fetch(forecast)
    .then(response => response.json())
    .then(data => {
      displayhourlyforecast(data.list);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayweather(data){
  const tempdiv = document.getElementById('temp-div');
  const weatherinfodiv = document.getElementById('weather-info');
  const hourlyforecastdiv = document.getElementById('hourly-forecast');
  weatherinfodiv.innerHTML = ''; 
  hourlyforecastdiv.innerHTML = ''; 
  
  if (data.cod == '404'){
    weatherinfodiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityname = data.name;
    const temper = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconcode = data.weather[0].icon;
    const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;

    tempdiv.innerHTML = `<h3>${cityname}</h3><p>${temper}°C</p><img src="${iconurl}" alt="${description}">`;
  }
}

function displayhourlyforecast(forecastData){
  const hourlyforecastdiv = document.getElementById('hourly-forecast');

  forecastData.forEach(hour => {
    const time = new Date(hour.dt * 1000).toLocaleTimeString('en-US', {hour: 'numeric', hour12: true});
    const temperature = Math.round(hour.main.temp - 273.15);
    const description = hour.weather[0].description;
    const iconcode = hour.weather[0].icon;
    const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;

    const hourlyItem = document.createElement('div');
    hourlyItem.classList.add('hourly-item');
    hourlyItem.innerHTML = `
      <p>${time}</p>
      <img src="${iconurl}" alt="${description}">
      <p>${temperature}°C</p>
    `;
    
    hourlyforecastdiv.appendChild(hourlyItem);
  });
}
