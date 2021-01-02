const API_KEY = `5e74d2d93a29e5ae4f9dfdee08748076`

const formEl = document.querySelector('.form')
const formInputEl = document.querySelector('.form__input')
const weatherLocationEl = document.querySelector('.weather__location')
const weatherValueEl = document.querySelector('.weather__value')
const weatherUnitEl = document.querySelector('.weather__unit')
const weatherHumidityEl = document.querySelector('.weather__humidity')
const weatherDescriptionEl = document.querySelector('.weather__description')

let latitude = null
let longitude = null


function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        console.log(`(${latitude}, ${longitude})`)
        await getWeatherByGeoLocation()
    })
}


async function getWeatherByGeoLocation() {
    if (latitude && longitude) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
            const data = await response.json()
            console.log(data)
            renderWeather(data)
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log('No Latitude or Longitude')
    }
}


async function getWeatherByCity(event) {
    event.preventDefault()
    const city = formInputEl.value
    console.log('City:', city)

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await response.json()
        console.log(data)
        renderWeather(data)
    } catch (error) {
        console.log(error)
    }
    formInputEl.value = ''
}


function renderWeather(data) {
    weatherLocationEl.textContent = data.name
    weatherValueEl.textContent = data.main.temp
    weatherUnitEl.textContent = 'C'
    weatherHumidityEl.textContent = data.main.humidity
    weatherDescriptionEl.textContent = data.weather[0].main
}


formEl.addEventListener('submit', getWeatherByCity)
getWeatherByGeoLocation()


/* Notes

Api EndPoint with lat,long  = `api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=${API_KEY}`
Api EndPoint with City name = `api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=${API_KEY}`

Required Attribute from API response
    name
    main.temp
    main.humidity
    weather[0].description
*/