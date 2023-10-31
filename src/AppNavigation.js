import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WalletScreen from './components/Wallet/WalletScreen';
import MapScreen from './components/Map/MapScreen';
import SettingsScreen from './components/Settings/SettingsScreen';

const Tab = createBottomTabNavigator()

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
