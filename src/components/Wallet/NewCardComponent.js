import { React } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const NewCardComponent = () => {
    
    return (
        <View style={styles.cardView}>
            <LinearGradient
                colors={["#699FFF", "#2564CD"]}
                style={styles.gradient}
            />
            <TextInput
                style={styles.cardNumberInput}
                placeholder="**** **"
                keyboardType='numeric'
            />
            <View
                style={styles.cardNameContainer}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    cardView: {
        width: 300,
        height: 200,
        position: "relative"
        // backgroundColor: "blue"
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    cardNumberInput: {
        position: "absolute",
        bottom: 20,
        left: 20,
        // right: 20,
        width: 95,
        height: 32,
        borderBottomColor: "white",
        borderBottomWidth: 2,
        // backgroundColor: "red",
        fontFamily: "Courier New",
        color: "white",
        fontWeight: "bold",
        fontSize: 21
    },
    cardNameContainer: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        display: "flex"
    },
    
})
