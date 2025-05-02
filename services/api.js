const IMAGE_API_KEY = process.env.REACT_APP_IMAGE_API_KEY 
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


const IMAGE_BASE_URL = "https://api.unsplash.com";
const WEATHER_BASE_URL = "http://api.weatherapi.com/v1";



export const searchCity = async (query) => {
    const response = await fetch(
        `${IMAGE_BASE_URL}/search/photos?page=1&query=${query}&client_id=${IMAGE_API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular; 
    } else {
        return null; 
    }
};

export const getWeather = async (city) => {
    const response = await fetch(
        `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    if (data.current) {
        return data.current;
    } else {
        throw new Error('Weather data not found');
    }
}

export const getWeatherForecast = async (city) => {
    const response = await fetch(
        `${WEATHER_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=10&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    if (data.forecast) {
        return data.forecast.forecastday;
    } else {
        throw new Error('Weather forecast data not found');
    }
}