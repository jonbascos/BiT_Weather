const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')

const updateUI = (data) => {

    const {cityDets, weather} = data

    // Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
        </div>
    `

    // Remove the d-none class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
    
    // Update Time section

    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'

    time.setAttribute('src', timeSrc)

    // Update Icon

    let weatherIcon = weather.WeatherIcon
    icon.setAttribute('src', `img/icons/${weatherIcon}.svg`)
    icon.setAttribute('alt', `${weather.WeatherText}`)
}
    

const updateCity = async (city) => {

    const cityDets = await getCity(city)
    const weather = await getWeather(cityDets.Key)

    return{cityDets,weather}
}

cityForm.addEventListener('submit', e => {
    e.preventDefault()

    // Get city value
    const city = cityForm.city.value.trim()
    cityForm.reset()

    // Update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))

    // Set localStorage
    localStorage.setItem('city', city)
})

if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}