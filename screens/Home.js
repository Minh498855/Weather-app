import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { searchCity } from '../services/api';

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
          value={city}
          onChangeText={setCity}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default Home;
/* {error && <Text style={styles.error}>{error}</Text>}
 */