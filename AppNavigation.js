import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import LoginScreen from './LoginScreen';
import { SessionProvider } from './SessionContext';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <SessionProvider>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        {/* Add other screens */}
      </Stack.Navigator>
    </SessionProvider>
  );
}

export default AppNavigation;
