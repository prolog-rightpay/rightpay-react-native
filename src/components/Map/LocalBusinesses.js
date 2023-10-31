
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const LocalBusinesses = ({ apiKey }) => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.1333,-73.7924&radius=5000&type=restaurant&key=${apiKey}`
        );
        setBusinesses(response.data.results);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <View>
      <Text>Local Businesses</Text>
      <View>
        {businesses.map((business) => (
          <Text key={business.place_id}>{business.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default LocalBusinesses;
