import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Account } from '../../api/session';
import { SessionContext } from '../../SessionContext';

export default class LoginScreen extends Component {
  static contextType = SessionContext;

  navigateToSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp'); // Navigate to SignUpScreen
  };

  navigateToForgotPassword = () => {
    const { navigation } = this.props;
    navigation.navigate('ForgotPassword'); // Navigate to ForgotPasswordScreen
  };

  handleLogin = () => {
    // Check the provided email and password
    // If login is successful, you can navigate to the user's dashboard or home screen
    // Otherwise, provide feedback to the user
    const { email, password } = this.state;
    if (email && password) {
      // Navigate to the user's dashboard or home screen
      this.context.signin(email, password)
        .catch(err => {
          Alert.alert("Error Signing In", err.message ?? "Unknown error", [
            { text: "OK", style: "cancel" }
          ]);
        });
    } else {
      alert('Please enter a valid email and password.');
    }
  };

  forceLogIn = () => {
    this.context.forceSignin()
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to RightPay</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={text => { this.setState({ email: text }) }}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={text => { this.setState({ password: text }) }}
        />
        <View style={styles.buttonSpacing}>
          <Button
            title="Log In"
            onPress={this.handleLogin}
            style={styles.button} // Set a fixed height for the button
          />
        </View>
        <View style={styles.buttonSpacing}>
          <Button
            title="Sign Up"
            onPress={this.navigateToSignUp}
            style={styles.button}
          />
        </View>
        <View style={styles.buttonSpacing}>
          <Button
            title="Forgot Password"
            onPress={this.navigateToForgotPassword}
            style={styles.button}
          />
        </View>
        <View style={styles.buttonSpacing}>
          <Button
            title="Force Log In"
            onPress={this.forceLogIn}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
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
