import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CityContext = createContext();

export const useCityContext = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favoriteCity');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (err) {
                console.error('Failed to load favorites', err);
            }
        };

        loadFavorites();
    }, []);

    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem('favoriteCity', JSON.stringify(favorites));
            } catch (err) {
                console.error('Failed to save favorites', err);
            }
        };

        saveFavorites();
    }, [favorites]);

    const addToFavorites = (city) => {
        setFavorites((prev) => (prev.includes(city) ? prev : [...prev, city]));
    };

    const value = {
        favorites,
        addToFavorites,
    };

    return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};
