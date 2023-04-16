import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import config from '../config';

const MainPage = ({ navigation, userID, handleLogout }) => {
    const [address, setAddress] = useState('');
    const API_KEY = config.API_KEY;
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');    
    const handleCheckIn = () => {
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
                fetch(`${config.API_URL}/employee/time/${config.serverAPIKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id : userID,
                            type : 'in',
                            time : formattedDate,
                            custom_time : 0,
                            location : address
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.errors) {
                            console.log(data);
                        }
                        else {
                            console.log(data.errors);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                console.log(address);
            })
            .catch((error) => console.error(error));
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    const handleCheckOut = () => {
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
                    fetch(`${config.API_URL}/employee/time/${config.serverAPIKey}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id : userID,
                                type : 'out',
                                time : formattedDate,
                                custom_time : 0,
                                location : address
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (!data.errors) {
                                console.log(data);
                            }
                            else {
                                console.log(data.errors);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    console.log(address);
                })
                .catch((error) => console.error(error));
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
    }

    return (
        <View style={styles.container}>
        <Text style={styles.text}>
            Welcome to the Main Page! {userID}
        </Text>
        <Text style={styles.text}>
            Your current address: {address} at {formattedDate}
        </Text>
        <Button
            title="Check In"
            onPress={handleCheckIn}
        />

        <Button
            title="Check Out"
            onPress={handleCheckOut}
        />

        <Button
            title="Logout"
            onPress={ handleLogout }
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
