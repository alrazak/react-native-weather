import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import axios from 'axios';

const WeatherInfo = () => {
  const [city, setCity] = useState('Jakarta');
  const [weatherData, setWeatherData] = useState({
    city: '',
    temperature: '',
    icon: '',
    main: '',
    description: '',
    visibility: '',
    windSpeed: '',
  });

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: cityName,
          appid: '0ae63c95705f8022ef51e1f2d93f1a81',
          units: 'metric' // Use 'metric' to get temperature in Celsius
        }
      });
      const data = response.data;
      setWeatherData({
        city: data.name,
        temperature: `${Math.round(data.main.temp)} C`,
        icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        main: data.weather[0].main,
        description: data.weather[0].description,
        visibility: `${data.visibility / 1000} km`,
        windSpeed: `${data.wind.speed} m/s`,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={() => fetchWeatherData(city)} />
      <View style={styles.marginTop20}>
        <Text style={styles.text}>The weather of {weatherData.city}</Text>
        <Text style={[styles.temperature, styles.marginTop20]}>{weatherData.temperature}</Text>
        <View style={[styles.rowContainer, styles.marginTop20]}>
          <Image
            source={{ uri: weatherData.icon }}
            style={styles.weatherIcon}
          />
          <Text style={[styles.text, styles.bold]}>{weatherData.main}</Text>
        </View>
        <Text style={styles.text}>{weatherData.description}</Text>
        <View style={[styles.rowContainer, styles.marginTop20]}>
          <Text style={[styles.text, styles.bold]}>Visibility :</Text>
          <Text style={[styles.text, styles.marginLeft15]}>{weatherData.visibility}</Text>
        </View>
        <View style={[styles.rowContainer, styles.marginTop20]}>
          <Text style={[styles.text, styles.bold]}>Wind Speed :</Text>
          <Text style={[styles.text, styles.marginLeft15]}>{weatherData.windSpeed}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginLeft15: {
    marginLeft: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
  bold: {
    fontWeight: '700',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperature: {
    fontWeight: '700',
    fontSize: 80,
    textAlign: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

export default WeatherInfo;
