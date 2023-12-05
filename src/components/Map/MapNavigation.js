import { React,  } from 'react';
import { Button, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './MapScreen'
import RewardsScreen from '../Rewards/RewardsScreen'

const Stack = createStackNavigator();

const MapNavigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Map" component={MapScreen} options={{
            headerShown: false
        }} />
        <Stack.Screen name="Rewards" component={RewardsScreen} options={{
          title: "Business"
        }} />
      </Stack.Navigator>
  );
}

export default MapNavigation;
