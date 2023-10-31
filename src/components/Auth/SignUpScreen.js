import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SessionContext } from '../../SessionContext';

function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();

  const context = useContext(SessionContext)

  const handleSignUp = () => {
    // Once sign-up is successful, navigate to the login page

    if (email && password && firstName && lastName) {
      context.signup(email, password, firstName, lastName)
      .then(() => {
        // once signed up, auto sign the user in
        context.signin(email, password)
        .then(() => {

          // console.log(`access token: ${context.apiSession.sessionToken}`);
        })
        .catch((_) => {
          // if sign in fails off a signup, bounce back to login
          navigation.navigate('Login');
        })
      })
      .catch(err => {
        Alert.alert("Error Signing Up", err.message ?? "Unknown error", [
          { text: "OK", style: "cancel" }
        ]);
      })
    } else {
      alert('Please complete all details.')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={[styles.input, {flex: 1, marginRight: 5}]}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, {flex: 1, marginLeft: 5}]}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
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
  }
});

export default SignUpScreen;
