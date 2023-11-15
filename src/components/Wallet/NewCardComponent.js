import { React } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CardComponent = ({ name, issuer, bin }) => {
    
    bin = bin.split("")
    bin.splice(4, 0, " ")
    bin = bin.join("")
    return (
        <View style={styles.cardView}>
            <LinearGradient
                colors={["#699FFF", "#2564CD"]}
                style={styles.gradient}
            />
            <Text
                style={styles.cardName}>{name}</Text>
            <Text
                style={styles.issuerName}>{issuer}</Text>
            <Text
                style={styles.cardNumberInput}
                // title="2937 38"
                // keyboardType='numeric'
            >{bin}</Text>
            <View
                style={styles.cardNameContainer}
            />
        </View>
    );

}
export default CardComponent

const styles = StyleSheet.create({
    cardView: {
        // width: 325,
        height: 200,
        position: "relative",
        // borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2

        // backgroundColor: "blue"
    },
    cardName: {
        position: "absolute",
        top: 20,
        left: 20,
        color: "white",
        fontWeight: "bold",
        fontSize: 24
    },
    issuerName: {
        position: "absolute",
        top: 50,
        left: 20,
        color: "white",
        opacity: 0.6,
        // fontWeight: "bold",
        fontSize: 20,
        // fontStyle: "italic"
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 15
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
