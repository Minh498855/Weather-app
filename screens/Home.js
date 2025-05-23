import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ImageBackground, Modal, TouchableWithoutFeedback } from 'react-native';
import { searchCity, getWeather } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, faEllipsis, faCheck, faPen, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useCityContext } from '../contexts/CityContext';

const Home = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [favoriteDetails, setFavoriteDetails] = useState({});
  const { favorites, removeFromFavorites ,unit, setUnit } = useCityContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [editList, setEditList] = useState(false);
  const [widthFavCity, setWidthFavCity] = useState('100%');


  const openModal = () => {
    setModalVisible(true);
  };

  const handleUnitSelection = (selectedUnit) => {
    setUnit(selectedUnit);
    setModalVisible(false);
  };

  const handleEditList = () => {
    setModalVisible(false);
    setEditList(true);
    setWidthFavCity('85%');  
  };

  const hanleDeleteBtn = (cityToRemove) => {
    removeFromFavorites(cityToRemove);
    setEditList(false);
    setWidthFavCity('100%');
  };

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
      <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        {editList && (  
          <TouchableOpacity onPress={() => hanleDeleteBtn(item)} style={styles.deleteIcon}>
            <FontAwesomeIcon icon={faMinus} size={25} color='white' style={{marginVertical: 9}} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CityWeather', {
              city: item,
              image,
              fromSearch: false,
            })
          }
          style={[styles.favoriteItem, {width: widthFavCity}]}
        >
          <ImageBackground source={{ uri: image }} style={styles.favoriteImage}>
            <View style={styles.favoriteContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 20 }}>
                <Text style={[styles.favoriteCity, {width: '69%'}]}>{item}</Text>
  
                {weather && 
                <Text style={[styles.weatherInfo, {width: '25%'}]}> 
                  {unit === 'C' ? weather.temp_c.toFixed(0) : weather.temp_f.toFixed(0)}°
                </Text>}
  
              </View>
              {weather && (
                <View>
                  <Text style={[styles.weatherInfo, { fontSize: 15, fontWeight: '400' }]}>{weather.condition.text}</Text>
                </View>
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 20 }}>
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

        <TouchableOpacity onPress={openModal}>
          <View style={styles.menu_Icon}>
            <FontAwesomeIcon icon={faEllipsis} size={25} style={{ color: 'white' }} />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        
          <View style={styles.modalContainer}>

              <View style={[styles.modalContent, {marginBottom: 10, marginTop: 7, borderRadius: 5}]}>
                <TouchableOpacity onPress={handleEditList} style={{ flexDirection: 'row', justifyContent: 'space-between',width: '90%', padding: 10, alignItems: 'center', marginLeft: 25}}>
                  <Text style={styles.modalText}>Edit List</Text>
                  <FontAwesomeIcon icon={faPen} size={15} style={styles.modalCheckIcon} />
                </TouchableOpacity>
              </View>

              <View style={[styles.modalContent, {borderTopStartRadius: 5, borderTopEndRadius: 5}]}>
                <View style={{width: 25, height: 25, marginTop: 10}}>
                  {unit === 'C' && <FontAwesomeIcon icon={faCheck} size={20} style={styles.modalCheckIcon} />}
                </View>
                <TouchableOpacity onPress={() => handleUnitSelection ('C')}>
                  <View style={styles.modalDegrees}>
                    <Text style={styles.modalText}>Celcius</Text>
                    <Text style={[styles.modalText, {fontWeight: '500'}]}>°C</Text>
                  </View>
                </TouchableOpacity>
              </View>


              <View style={[styles.modalContent, {marginBottom: 7, borderBottomStartRadius: 5, borderBottomEndRadius: 5}]}>
                <View style={{width: 25, height: 25, marginTop: 10}}>
                  {unit === 'F' && <FontAwesomeIcon icon={faCheck} size={20} style={styles.modalCheckIcon} />}
                </View>
                <TouchableOpacity onPress={() => handleUnitSelection ('F')}>
                  <View  style={styles.modalDegrees}>
                    <Text style={styles.modalText}>Fahrenheit</Text>
                    <Text style={[styles.modalText, {fontWeight: '500'}]}>°F</Text>
                  </View>
                </TouchableOpacity>
              </View>

          </View>
      </Modal>

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
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
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
    marginHorizontal: 15,
  },
  weatherInfo: {
    color: 'white',
    fontSize: 55,
    marginHorizontal: 5,
    fontWeight: '300',
  },
  menu_Icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginVertical: 7,
    marginHorizontal: 10,
  },

  modalContainer: {
    position: 'absolute',
    top: 57,
    right: 10,
    width: '53%',
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
  },

  modalContent: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'rgb(64,63,63)',
    width: '95%'
  },
  modalDegrees: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%', 
    padding: 10, 
    alignItems: 'center'
  },

  modalText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
  },

  modalCheckIcon: {
    color: 'white',
    marginLeft: 7,
  },
  deleteIcon: {
    alignItems: 'center',
    width: '10%',
    height: '30%',
    marginHorizontal: 5,
    marginVertical: 'auto',
    backgroundColor: 'red',
    borderRadius: 50,
  }
});

export default Home;
