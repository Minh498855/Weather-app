import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { searchCity } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useCityContext } from '../contexts/CityContext';

const Home = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const { favorites } = useCityContext();

  const handleSearch = async () => {
    try {
      const image = await searchCity(city);
      if (image) {
        navigation.navigate('CityWeather', { city, image });
      } else {
        setError('No image found for this city.');
      }
    } catch (err) {
      setError('An error occurred while fetching the image.');
    }
  };

  const renderFavoriteCity = ({ item }) => (
    <TouchableOpacity 
    onPress={() => navigation.navigate('CityWeather', { city: item, image: '' })}  
    style={styles.favoriteItem}
    >

      <Text style={styles.favoriteText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          placeholderTextColor="white"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <FontAwesomeIcon style={styles.searchIcon} icon={faMagnifyingGlass} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderFavoriteCity}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#248dab',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#248dab',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 30,
  },
  input: {
    fontSize: 18,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    color: 'white',
  },
  searchBtn: {
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  searchIcon: {
    color: 'white',
    marginRight: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  favoriteItem: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
  },
  favoriteText: {
    fontSize: 16,
    color: '#248dab',
  },
});

export default Home;