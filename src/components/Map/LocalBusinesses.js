
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BusinessItem } from './BusinessItem';
import { haversineDistance } from '../../math/distance';

const LocalBusinesses = ({ apiKey, onBusinessPress }) => {
  const [businesses, setBusinesses] = useState([]);

  const userLat = 41.1333
  const userLong = -73.7924

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLong}&radius=5000&type=restaurant&key=${apiKey}`
        );
        var businesses = response.data.results.filter(item => {
          if (item.types.length == 0) {
            return false
          }
          if (item.opening_hours?.open_now == false) {
            return false
          }
          return true
        })
        businesses = businesses.map(business => {
          if (business.types[0] == "cafe") {
            business.rewards = 2
          }
          if (business.types[0] == "restaurant") {
            business.rewards = 1
          }
          const { lat, lng } = business.geometry.location
          const distance = haversineDistance(userLat, userLong, lat, lng)
          business.miles = distance.miles
          business.feet = distance.feet
          return business
        })
        businesses = businesses.sort((a, b) => { return a.miles - b.miles })
        setBusinesses(businesses);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchData();
  }, [apiKey]);

  const handleItemPress = item => {
    switch (item.id) {
    case "SignOut":
        context.signout()
        return
    }
  }

  const refreshButtonOnPress = () => {

  }

  const renderSectionHeader = ({section: {title}}) => (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>RightPay</Text>
          <Text style={styles.sectionHeader}>{title}</Text>
        </View>
          
        <Pressable title="Refresh" style={styles.refreshButton} onPress={refreshButtonOnPress}>
          <TouchableOpacity>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </Pressable>
      </View>
      <View style={styles.separator}></View>
      </View>
  )

  const renderItem = ({item}) => {
    let type = undefined
    if (item.types.length > 0) {
      type = item.types[0].replace(/_/g, " ")
    }
    let distance = ""
    if (item.miles < 0.01) {
      distance = `${item.feet.toFixed(2)} ft`
    } else {
      distance = `${item.miles.toFixed(2)} mi`
    }
    return (<BusinessItem name={item.name} type={type} distance={distance} rewards={item.rewards} onPress={() => onBusinessPress(item)} />)
  }

  const renderText = item => {
      switch (item.id) {
      case "CurrentUser":
          return "Signed in as " + context.account.email
      default:
          return item.title
      }
  }

  return (
    <FlatList
          style={styles.sectionList}
          data={businesses}
          keyExtractor={item => item.place_id}
          renderItem={renderItem}
      />
  );
};

const styles = StyleSheet.create({
})

export default LocalBusinesses;
