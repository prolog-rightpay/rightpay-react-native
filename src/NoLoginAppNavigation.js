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
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, title: "Sign In" }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Sign Up" }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NoLoginAppNavigation;
