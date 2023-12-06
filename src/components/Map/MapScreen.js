import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, FlatList, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SessionContext } from '../../SessionContext';
import LocalBusinesses from './LocalBusinesses';
import MapComponent from './MapComponent';
import { haversineDistance } from '../../math/distance';

const MapScreen = ({ navigation }) => {

  const apiKey = 'AIzaSyB64gdwrAFao31Q3XyNETWBqFrgSKwOSHg';

  const refreshButtonOnPress = async () => {
    try {
      await fetchData()
      await searchRewards()
    } catch (err) {
      console.log(err)
    }
    
  }

  const [businesses, setBusinesses] = useState([]);
  const [rewards, setRewards] = useState([])
  
  const context = useContext(SessionContext)
  const { apiSession } = context

  const userLat = 41.1333
  const userLong = -73.7924

  const removeDuplicates = (list, key) => {
    const seen = new Set();
    return list.filter(item => {
      const value = item[key];
      if (!seen.has(value)) {
        seen.add(value);
        return true;
      }
      return false;
    });
  };

  const fetchData = async () => {
    try {
      const restRes = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLong}&types=restaurant&radius=5000&key=${apiKey}`
      );
      const storeRes = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLong}&types=store&radius=5000&key=${apiKey}`
      );

      const data = removeDuplicates([...restRes.data.results, ...storeRes.data.results], "name")

      var businesses = data.filter(item => {
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

  useEffect(() => {
      fetchData()
      .then(async () => {
        await searchRewards()
      })
    
  }, [apiKey]);

  searchRewards = async () => {
    const categories = new Set()
    businesses.forEach(b => categories.add(b.types[0]))

    const categoryRewards = {}
    Array.from(categories).forEach(c => { categoryRewards[c] = [] })

    await Promise.all(Array.from(categories).map(async type => {
      const rewards = await apiSession.rewardsSearch("category", type)
      console.log("searching for rewards for: " + type + ", got " + rewards.length)
      categoryRewards[type].push(...rewards)
    }))

    setRewards(categoryRewards)
  }

  const onBusinessPress = business => {
    navigation.navigate('Rewards', { data: { business: business, rewards: rewards[business.types[0]] } })
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
                
                <TouchableOpacity style={styles.refreshButton} onPress={refreshButtonOnPress}>
                  <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>
          </View>

          <LocalBusinesses businesses={businesses} rewards={rewards} apiKey={apiKey} onBusinessPress={onBusinessPress} />
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