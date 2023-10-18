// MapComponent.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import LocalBusinesses from './LocalBusinesses';

const MapComponent = () => {
  const initialRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const apiKey = 'AIzaSyB64gdwrAFao31Q3XyNETWBqFrgSKwOSHg';

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {/* You can add markers or other map features here */}
      </MapView>
      <LocalBusinesses apiKey={apiKey} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
