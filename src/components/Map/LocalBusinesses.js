
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BusinessItem } from './BusinessItem';
import { haversineDistance } from '../../math/distance';
import { SessionContext } from '../../SessionContext';

const LocalBusinesses = ({ apiKey, onBusinessPress, businesses, rewards }) => {

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

    return (<BusinessItem name={item.name} type={type} distance={distance} rewards={rewards[type]?.length || 0} onPress={() => onBusinessPress(item)} />)
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
