import { React, useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

const NewPaymentMethodScreen = ({ navigation }) => {

    const [bin, setBin] = useState('');
    // const [buttonBackground, setButtonBackground] = useState('lightgray');
    const [buttonDisabled, setButtonDisabled] = useState(true)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Enter the first 6 digits of your credit card</Text>
            <TextInput
                style={styles.textInput}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                value={bin}
                autoFocus={true}
                onChangeText={text => {
                    setBin(text)
                    setButtonDisabled(text.length != 6)
                }}
            />
            <TouchableOpacity disabled={buttonDisabled} style={[styles.buttonContainer, {
                backgroundColor: buttonDisabled ? "lightgray" : "rgba(0, 122, 255, 1.0)"
                }]} onPress={() => {
                    navigation.navigate("SelectPaymentMethod", {data: { bin: bin } })
                }}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );

}
export default NewPaymentMethodScreen

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: "white"
    },
    text: {
        fontSize: 18,
        marginBottom: 12,
        color: "gray",
    },
    textInput: {
        height: 50,
        // borderBottomColor: "lightgray",
        // borderBottomWidth: 2,
        marginBottom: 20,

        borderBottomColor: "lightgray",
        borderBottomWidth: 2,
        // backgroundColor: "red",
        fontFamily: "Courier New",
        // color: "white",
        fontWeight: "bold",
        fontSize: 30
    },
    buttonContainer: {
        height: 40,
        // backgroundColor: "rgba(0, 122, 255, 1.0)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    }
})