import React, { Component } from 'react';
import { SafeAreaView, Image, View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
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

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <View behavior="padding" style={styles.scrollView}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Image style={styles.logo} source={require("../../../assets/logo.png")}/>
          <TextInput
            style={[styles.input, styles.emailInput]}
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={text => { this.setState({ email: text }) }}
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => { this.passwordInput.focus(); }}
          />
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.password}
            ref={(input) => { this.passwordInput = input; }}
            onChangeText={text => { this.setState({ password: text }) }}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          {/* <View style={styles.buttonSpacing}>
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
          </View> */}
          {/* <View style={styles.buttonSpacing}>
            <Button
              title="Forgot Password"
              onPress={this.navigateToForgotPassword}
              style={styles.button}
            />
          </View> */}
        </KeyboardAvoidingView>
        {/* <View style={styles.buttonSpacing}> */}
        <SafeAreaView style={{alignItems: "center"}}>
        <Button
              title="Create Account"
              onPress={this.navigateToSignUp}
              style={styles.button}
            />
        </SafeAreaView>
            
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    padding: 36,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    // width: '100%',
    // height: 40,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 4,
    // paddingHorizontal: 8,
    // marginBottom: 16,
    width: '100%',
    height: 40,
    borderBottomColor: "#d8d8d8",
    fontSize: 18,
    borderBottomWidth: 1
  },
  emailInput: {
    marginBottom: 10
  },
  passwordInput: {
    marginBottom: 46
  },
  buttonSpacing: {
    marginVertical: 8,
    width: '100%',
  },
  button: {
    height: 40,
  },
  logo: {
    height: 65,
    aspectRatio: 3.766666666666667,
    marginBottom: 36,
  },
  buttonContainer: {
    height: 40,
    backgroundColor: "rgba(0, 122, 255, 1.0)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    width: '100%'
  },
  buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold"
  },
});
