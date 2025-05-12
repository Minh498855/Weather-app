import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ImageBackground, ScrollView } from 'react-native';
import { searchCity, getWeather } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useCityContext } from '../contexts/CityContext';

const Home = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [favoriteDetails, setFavoriteDetails] = useState({});
  const { favorites } = useCityContext();

  const handleSearch = async () => {
    try {
      const image = await searchCity(city);
      if (image) {
        navigation.navigate('CityWeather', {
          city,
          image,
          fromSearch: true,
        });
        setCity('');
        setError('');
      } else {
        setError('No image found for this city.');
      }
    } catch (err) {
      setError('An error occurred while fetching the city data.');
    }
  };

  useEffect(() => {
    const loadFavoriteDetails = async () => {
      const details = {};
      for (const fav of favorites) {
        try {
          const [image, weather] = await Promise.all([
            searchCity(fav),
            getWeather(fav),
          ]);
          details[fav] = { image, weather };
        } catch {
          details[fav] = { image: '', weather: null };
        }
      }
      setFavoriteDetails(details);
    };

    loadFavoriteDetails();
  }, [favorites]);

  const renderFavoriteCity = ({ item }) => {
    const details = favoriteDetails[item];
    const image = details?.image || '';
    const weather = details?.weather;

    return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CityWeather', {
              city: item,
              image,
              fromSearch: false,
            })
          }
          style={styles.favoriteItem}
        >
          <ImageBackground source={{ uri: image }} style={styles.favoriteImage}>
            <View style={styles.favoriteContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={styles.favoriteCity}>{item}</Text>
                {weather && <Text style={styles.weatherInfo}> {weather.temp_f.toFixed(0)}°</Text>}
              </View>
              {weather && (
                <View>
                  <Text style={[styles.weatherInfo, { fontSize: 15, fontWeight: '400' }]}>{weather.condition.text}</Text>
                </View>
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>
    );
  };

  return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 20}}>   
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter city"
              placeholderTextColor="rgba(0, 0, 0, 0.8)"
              value={city}
              onChangeText={setCity}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <FontAwesomeIcon style={styles.searchIcon} icon={faMagnifyingGlass} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity>
            <View style={styles.menu_Icon}>
              <FontAwesomeIcon icon={faEllipsis} size={25} style={{ color: 'white' }} />
            </View>
          </TouchableOpacity>

        </View>

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={{ flex: 1, width: '100%' }}>
          <FlatList
            data={favorites}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={renderFavoriteCity}
            nestedScrollEnabled={true}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
/*     marginHorizontal: 30,
    marginBottom: 30,
    marginTop: 50, */
    width: '85%',
    marginLeft: 20,
  },
  input: {
    fontSize: 18,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  searchBtn: {
    padding: 10,
    borderRadius: 5,
  },
  searchIcon: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  favoriteItem: {
    marginVertical: 10,
    width: '95%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',

  },
  favoriteImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  favoriteContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'black',
  },
  favoriteCity: {
    fontSize: 55,
    color: 'white',
    fontWeight: '300',
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  weatherInfo: {
    color: 'white',
    fontSize: 55,
    marginHorizontal: 10,
    fontWeight: '300',
  },
  menu_Icon: {
/*   position: 'absolute', 
  top: 5, 
  right: 10, 
  marginVertical: 10,  */
  width: 30, 
  height: 30, 
  alignItems: 'center', 
  borderRadius: 20, 
  borderWidth: 2, 
  borderColor: 'white',
  marginVertical: 7,
  marginHorizontal: 10,
  }
});

export default Home;
