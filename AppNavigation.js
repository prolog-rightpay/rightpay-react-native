import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WalletScreen from './WalletScreen';
import MapView from './MapView';

const Tab = createBottomTabNavigator()

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Map" component={MapView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
