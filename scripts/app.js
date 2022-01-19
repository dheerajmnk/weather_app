const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {

    const { cityInfo, weather } = data; // destructure properties

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `;

    // update icons
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    

    // update images
    let timeSrc = weather.isDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // remove d-none class after user performs first submit action
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    
    const cityInfo = await getCity(city);
    const weather = await getWeather(cityInfo.Key);

    return { cityInfo, weather }; // same property name and value 
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update ui with new city value
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

});