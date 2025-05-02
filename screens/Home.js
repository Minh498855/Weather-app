import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { searchCity } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



const Home = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');



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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          placeholderTextColor='white'
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch} 

        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}><FontAwesomeIcon style={styles.searchIcon} icon={faMagnifyingGlass}/></TouchableOpacity>

      </View>
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
});

export default Home;
/* {error && <Text style={styles.error}>{error}</Text>}
 */