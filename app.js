const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input')
const cityName = document.querySelector('.city-name h3');
const cardBody = document.querySelector('.card-body');
const countryName = document.querySelector('.city-name p');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

const calCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}


const dayTime = (icon) =>{
    if (icon.includes('d')){
        return true
    } else {
        return false
    }
}

updateWeatherApp2 = (country) => {
   //console.log(country)
    countryName.textContent = country.name;
    countryName.innerHTML =`
   
          <div class="city-name my-3">
            <p> ${country.sys.country}</p>
          </div>
            
    `

}


updateWeatherApp = (city) => {
    console.log(city);
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-body">
    <div class="card-mid row">
      <div class="col-6 text-center temp">
        <span>${calCelcius(city.main.temp)}&deg;C</span>
      </div>
      <div class="col-6 condition-temp temp2">
        <p class="condition">${city.weather[0].description}</p>
        <p class="high">${calCelcius(city.main.temp_max)}&deg;</p>
        <p class="low">${calCelcius(city.main.temp_min)}&deg;</p>
      </div>
    </div>

    <div class="icon-container card shadow mx-auto">
      <img src="${iconSrc}" alt="cloud" />
    </div>
    <div class="card-bottom px-5 py-4 row">
      <div class="col text-center">
        <p>${calCelcius(city.main.feels_like)}&deg;C</p>
        <span>Feels Like</span>
      </div>
      <div class="col text-center">
        <p>${city.main.humidity}%</p>
        <span>Humidity</span>
      </div>
    </div>
  </div>
    `
    if (dayTime(imageName)) {
        console.log('day');
       timeImage.setAttribute('src', 'img/day.svg');
       if (cityName.classList.contains('text-white')){
        cityName.classList.remove('text-white');
        countryName.classList.remove('text-white');
       } else {
        cityName.classList.add('text-black')
        countryName.classList.add('text-black');
       }
       
    }else {
        console.log('night');
        timeImage.setAttribute('src', 'img/night.svg');
        if (cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
            countryName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white')
            countryName.classList.add('text-white');
        }

        
    }

        cardInfo.classList.remove('d-none');
    
}




//add an event listener to the form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();


    requestCity(citySearched)
        .then((data) => {
            updateWeatherApp(data);
        })
        .catch((error) => {
            console.log(error)
        })


    requestCity(citySearched)
    .then((data) => {
        updateWeatherApp2(data);
    })
    .catch((error) => {
        console.log(error)
    })


    
})