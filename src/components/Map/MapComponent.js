// MapComponent.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import LocalBusinesses from './LocalBusinesses';

const MapComponent = ({ location }) => {
  
  const [mapRegion, setMapRegion] = useState({
    latitude: 41.1333,
    longitude: -73.7924,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })

  // console.log(`long: ${long}, lat: ${lat}`)

  useEffect(() => {
    if (!location) {
      return
    }
    const { longitude: long, latitude: lat } = location.coords
    setMapRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    })
  }, [location])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // initialRegion={mapRegion}
        region={mapRegion}
        showsUserLocation={true}
        mapPadding={{ top: 0, left: 0, bottom: 20, right: 0 }}
      >
        {/* You can add markers or other map features here */}
      </MapView>
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
