import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableOpacity} from 'react-native';
import { getWeather, getWeatherForecast } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWind, faDroplet, faSun, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useCityContext } from '../contexts/CityContext';

const CityWeather = ({ route }) => {
  const { city, image } = route.params;
  const [weather, setWeather] = useState('');
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const { addToFavorites } = useCityContext();


  useEffect(() => {
    const loadWeather = async () => {
      try {
        const weatherData = await getWeather(city);
        setWeather(weatherData);
      } catch (err) {
        setError('An error occurred while fetching the weather data.');
      }
    };
    loadWeather();

    const loadForecast = async () => {
      try {
        const forecastData = await getWeatherForecast(city);
        setForecast(forecastData);
      } catch (err) {
        setError('An error occurred while fetching the weather forecast.');
      }
    };
    loadForecast();
  }, [city]);


  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground source={{ uri: image }} style={styles.backgroundImage}>
          <View style={styles.overlay}>

            <TouchableOpacity 
            style={{backgroundColor: 'rgba(0,0,0,0.5)', width: '15%', alignItems: 'center', borderRadius: 5, position: 'absolute', top: 20, right: 20}} 
            onPress={addToFavorites(city)}
            >
              <Text style={{color: 'white', fontSize: 20}}>Add</Text>
            </TouchableOpacity>

          <Text style={styles.cityName}>{city}</Text>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : weather ? (
            <View style={styles.currentContainer}>
              <Image
                source={{ uri: `https:${weather.condition.icon}` }}
                style={{ width: 110, height: 100, tintColor: 'white', marginTop: 30, marginBottom: 5 }}
              />
              <Text style={styles.currentTemp}>{weather.temp_f.toFixed(0)}°</Text>
              <Text style={styles.temp_feelsLike}>Feels Like {weather.feelslike_f.toFixed(0)}°</Text>

              <View style={styles.weatherInfoContainer}>
                <View style={styles.weatherInfo}>
                  <FontAwesomeIcon icon={faWind} size={18} color="white" style={{ marginVertical: 2 }} />
                  <Text style={styles.infoText}>{weather.wind_mph} mph</Text>
                </View>
                <View style={styles.weatherInfo}>
                  <FontAwesomeIcon icon={faDroplet} size={18} color="white" style={{ marginVertical: 2 }} />
                  <Text style={styles.infoText}>{weather.humidity}%</Text>
                </View>
                <View style={styles.weatherInfo}>
                  <FontAwesomeIcon icon={faSun} size={18} color="white" style={{ marginVertical: 2 }} />
                  <Text style={styles.infoText}>{weather.uv}</Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.loadingText}>Loading...</Text>
          )}

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={styles.hourlyScroll}>
            <View style={styles.forecastTimeContainer}>
              {forecast[0]?.hour.map((hr, index) => (
                <View key={`${forecast[0].date}-${index}`} style={styles.hourContainer}>
                  <Text style={styles.hourText}>{hr.time.substring(11, 16)}</Text>
                  <Image
                    source={{ uri: `https:${hr.condition.icon}` }}
                    style={{
                      width: 50,
                      height: 50,
                      tintColor: 'white',
                      marginHorizontal: 20,
                    }}
                  />
                  <Text style={styles.tempText}>{hr.temp_f.toFixed(0)}°</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <ScrollView style={styles.forecastScroll}>
            <View style={styles.forecastDayContainer}>
              <View style={styles.forecastHeader}>
                <FontAwesomeIcon icon={faCalendarDays} size={15} color='rgba(255, 255, 255, 0.7)' style={{ marginVertical: 2, marginHorizontal: 5 }} />
                <Text style={styles.forecastHeaderText}>10-DAY FORECAST</Text>
              </View>
              {forecast.map((day, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <Text style={styles.forecastText}>{(day.date).substring(5, 10)}</Text>
                  <Image source={{ uri: `https:${day.day.condition.icon}` }} style={{ width: 40, height: 40, tintColor: 'white' }} />
                  <Text style={[styles.forecastText, { color: '#4a9ee8' }]}>{day.day.mintemp_f.toFixed(0)}°</Text>
                  <Text style={[styles.forecastText, { color: '#f50c37' }]}>{day.day.maxtemp_f.toFixed(0)}°</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    width: '100%',

  },
  overlay: {
    backgroundColor: 'rgba(0,0,0, 0.25)', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent:'flex-start', 
    padding: 10,
    paddingTop: 25,
  },
  currentContainer: {
    marginVertical: 15,
    alignItems: 'center',
    width: '85%',
    padding: 30,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: 10,
  },
  forecastTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: 10,
  },
  forecastScroll: {
    width: '100%',
    marginTop: 15,
  },
  forecastDayContainer: {
    width: '100%',
    minHeight: 200,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    marginTop: 10,
    padding: 20,
    borderRadius: 15,

  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cityName: {
    fontSize: 50,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  currentTemp: {
    fontSize: 75,
    marginLeft: 25,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  temp_feelsLike: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  weatherInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginRight: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    marginHorizontal: 5,
    fontSize: 17,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 20,
  },
  hourlyScroll: {
    marginTop: 5,
  },
  hourContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hourText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
  tempText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  forecastHeaderText: {
    color: 'rgba(255, 255, 255, 0.7)',
    height: 30,
    fontSize: 15,
    fontWeight: 'bold',
 
  },
  forecastHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.7)',
  },
  forecastText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default CityWeather;