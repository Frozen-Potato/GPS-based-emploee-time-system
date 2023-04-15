// App.js

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginPage from './components/login';
import MainPage from './components/mainPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  const handleLogin = (id) => {
    setUserID(id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserID(null);
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <MainPage userID = {userID} handleLogout={handleLogout} />
      ) : (
        <LoginPage handleLogin={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
