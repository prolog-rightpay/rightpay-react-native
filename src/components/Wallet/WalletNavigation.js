import { React,  } from 'react';
import { Button, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewPaymentMethodScreen from './NewPaymentMethodScreen';
import WalletScreen from './WalletScreen'
import EditWalletScreen from './EditWalletScreen';
import SelectPaymentMethodScreen from './SelectPaymentMethodScreen';
import ConfirmPaymentMethodScreen from './ConfirmPaymentMethodScreen';

const Stack = createStackNavigator();

const WalletNavigation = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PaymentMethods" component={WalletScreen} options={{
            // headerRight: () => (
            //     <Button
            //         title="New"
            //         onPress={() => {
                        
            //         }}
            //     />
            // )
        }} />
        <Stack.Screen name="NewPaymentMethod" component={NewPaymentMethodScreen} options={{
          title: "New Card"
        }} />
        <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethodScreen} options={{
          title: "Select Card"
        }} />
        <Stack.Screen name="ConfirmPaymentMethod" component={ConfirmPaymentMethodScreen} options={{
          title: "Confirm Card"
        }} />
        <Stack.Screen name="EditWallet" component={EditWalletScreen} options={{
          title: "Edit Cards"
        }} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default WalletNavigation;
