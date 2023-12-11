import React, { useContext, useState } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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

  var emailInput = null
  var lastNameInput = null
  var passwordInput = null

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.scrollView}>
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../../../assets/logo.png")}/>
          <TextInput
            style={[styles.input, styles.emailInput]}
            placeholder="First Name"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => { lastNameInput.focus(); }}
            // autoCorrect={false}
            // autoCapitalize="none"
            value={firstName}
            onChangeText={text => { setFirstName(text) }}
            // keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, styles.emailInput]}
            placeholder="Last Name"
            ref={(input) => { lastNameInput = input; }}
            blurOnSubmit={false}
            onSubmitEditing={() => { emailInput.focus(); }}
            returnKeyType="next"
            // autoCorrect={false}
            // autoCapitalize="none"
            value={lastName}
            onChangeText={text => { setLastName(text) }}
            // keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, styles.emailInput]}
            placeholder="Email"
            ref={(input) => { emailInput = input; }}
            returnKeyType="next"

            blurOnSubmit={false}
            onSubmitEditing={() => { passwordInput.focus(); }}

            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={text => { setEmail(text) }}
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            ref={(input) => { passwordInput = input; }}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={text => { setPassword(text) }}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
        </View>
        {/* <View style={styles.buttonSpacing}> */}            
      </KeyboardAvoidingView>
    );
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
    marginBottom: 40
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


export default SignUpScreen;
