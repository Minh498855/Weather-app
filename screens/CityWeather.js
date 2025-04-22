import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const CityWeather = ({ route }) => {
  const { city, image } = route.params;

  return (
    <ImageBackground source={{ uri: image }} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: 30,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  cityName: {
    fontSize: 32,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default CityWeather;