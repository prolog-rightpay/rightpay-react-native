import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import MapComponent from './MapComponent';

const MapView = () => {

  return (
    <MapComponent />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  }
});

export default MapView;