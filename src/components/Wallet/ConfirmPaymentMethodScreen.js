import { React, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SectionList, Button } from 'react-native';
import NewCardComponent from './NewCardComponent'

const ConfirmPaymentMethodScreen = ({ navigation, route }) => {
    const data = route.params.data
    console.log(data)

    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.titleText}>Add this card to RightPay?</Text>
            <View style={styles.cardContainer}>
                <NewCardComponent
                    style={styles.newCard}
                    name={data.paymentMethod.name}
                    issuer={data.issuer.name}
                    bin={data.bin}
                />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                    navigation.navigate("PaymentMethods", { data: { } })
                }}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            
            
            </View>
        </View>
    )
}
export default ConfirmPaymentMethodScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 24,
        paddingRight: 24,
        display: "flex",
        justifyContent: "space-between"
    },
    titleText: {
        color: "gray",
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center"
    },
    buttonContainer: {
        height: 40,
        backgroundColor: "rgba(0, 122, 255, 1.0)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    cardContainer: {
        marginBottom: 20
    }
})
