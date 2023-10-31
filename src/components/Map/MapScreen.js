import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import LocalBusinesses from './LocalBusinesses';
import MapComponent from './MapComponent';

const MapScreen = () => {

  const apiKey = 'AIzaSyB64gdwrAFao31Q3XyNETWBqFrgSKwOSHg';

  return (
    <View style={styles.root}>
      <View style={styles.map}>
        <MapComponent />
      </View>

      <View style={styles.overlay}>
        <SafeAreaView>
          <LocalBusinesses apiKey={apiKey} />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  map: {
    flex: 1
  },
  overlay: {
    height: 300,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2, 
  }
});

export default MapScreen;