import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import config from '../config';

const MainPage = ({ navigation, userID }) => {
    const [address, setAddress] = useState('');
    const API_KEY = config.API_KEY;
    const getCurrentLocation = () => {
        console.log(API_KEY);
        Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            )
            .then((response) => response.json())
            .then((responseJson) => {
                const address =
                responseJson.results[0].formatted_address;
                setAddress(address);
                // Send the address to the backend here
                console.log(address);
            })
            .catch((error) => console.error(error));
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    return (
        <View style={styles.container}>
        <Text style={styles.text}>
            Welcome to the Main Page! {userID}
        </Text>
        <Text style={styles.text}>
            Your current address: {address}
        </Text>
        <Button
            title="Get Current Location"
            onPress={getCurrentLocation}
        />
        <Button
            title="Logout"
            onPress={() => navigation.navigate('Login')}
        />
        </View>
    );
    };

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
text: {
    fontSize: 24,
    marginBottom: 10,
},
});

export default MainPage;
