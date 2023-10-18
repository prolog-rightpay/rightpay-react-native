import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to SignUpScreen
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigate to ForgotPasswordScreen
  };

  const navigateToWalletScreen = () => {
    navigation.navigate('Wallet'); // Navigate to the Wallet screen
  };
  

  const handleLogin = () => {
    // Check the provided email and password
    // If login is successful, you can navigate to the user's dashboard or home screen
    // Otherwise, provide feedback to the user
    if (email && password) {
      alert(`Logged in with email: ${email}`);
      // Navigate to the user's dashboard or home screen
    } else {
      alert('Please enter a valid email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to RitePay</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonSpacing}>
        <Button
          title="Log In"
          onPress={handleLogin}
          style={styles.button} // Set a fixed height for the button
        />
      </View>
      <View style={styles.buttonSpacing}>
        <Button
          title="Sign Up"
          onPress={navigateToSignUp}
          style={styles.button}
        />
      </View>
      <View style={styles.buttonSpacing}>
        <Button
          title="Forgot Password"
          onPress={navigateToForgotPassword}
          style={styles.button}
        />
      </View>
<View style={styles.buttonSpacing}>
  <Button
    title="Go to Wallet"
    onPress={navigateToWalletScreen} // Call the navigateToWalletScreen function
    style={styles.button}
  />
</View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  buttonSpacing: {
    marginVertical: 8,
    width: '100%',
  },
  button: {
    height: 40,
  },
});
