import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, FlatList, Modal, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import LocalBusinesses from './LocalBusinesses';
import MapComponent from './MapComponent';

const MapScreen = () => {

  const apiKey = 'AIzaSyB64gdwrAFao31Q3XyNETWBqFrgSKwOSHg';

  const refreshButtonOnPress = () => {

  }

  return (
    <View style={styles.root}>
      <View style={styles.map}>
        <MapComponent />
      </View>

      <View style={styles.overlay}>
          <View>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>RightPay</Text>
                <Text style={styles.sectionHeader}>Local Businesses</Text>
              </View>
                
              <Pressable title="Refresh" style={styles.refreshButton} onPress={refreshButtonOnPress}>
                <TouchableOpacity>
                  <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
              </Pressable>
            </View>
            <View style={styles.separator}></View>
          </View>

          <LocalBusinesses apiKey={apiKey} />
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
    height: 350,
    // flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 24,
    marginRight: 24,
    marginTop: 18,
    marginBottom: 14,
  },
  separator: {
    height: 1,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    // marginLeft: 24,
    // marginRight: 24,
  },
  refreshButton: {
  },
  refreshButtonText: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "rgba(0, 122, 255, 1.0)"
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 16,
    color: "gray",
  },
  sectionList: {
    overflow: "hidden",
    borderRadius: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: 18,
    // marginLeft: 24,
    // marginRight: 24,
    marginBottom: 1
  },
  titleContainer: {
    alignItems: "flex-start"
  }
});

export default MapScreen;