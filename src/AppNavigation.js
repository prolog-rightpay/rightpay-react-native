import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsScreen from './components/Settings/SettingsScreen';
import WalletNavigation from './components/Wallet/WalletNavigation';
import MapNavigation from './components/Map/MapNavigation';

const Tab = createBottomTabNavigator()

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="MapNavigation" component={MapNavigation} options={{ headerShown: false, title: "Map" }} />
        <Tab.Screen name="Wallet" component={WalletNavigation} options={{ headerShown: false, title: "Wallet" }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings "}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
