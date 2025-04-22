const API_KEY = "5dLJdGUpZriOcBL8u_zWO3J3zZB5OxXAsQyVAzqZ0bY";
const BASE_URL = "https://api.unsplash.com";



export const searchCity = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/photos?page=1&query=${query}&client_id=${API_KEY}`
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