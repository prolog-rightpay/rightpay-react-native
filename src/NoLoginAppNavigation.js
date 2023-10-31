import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from './components/Auth/SignUpScreen';
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen';
import LoginScreen from './components/Auth/LoginScreen';


const Stack = createStackNavigator();

function NoLoginAppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NoLoginAppNavigation;
