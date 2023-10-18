// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation'; // Your main navigation component

export default function App() {

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
