import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, SectionList, Text, TouchableOpacity, Image } from 'react-native';
import { SessionContext } from '../../SessionContext';

const WalletScreen = ({ navigation }) => {
    const context = useContext(SessionContext)
    const { apiSession } = context

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [sections, setSections] = useState([{id: "root", data:[]}])

    getData = async () => {
        const paymentMethods = (await apiSession.getPaymentMethods())
            .map(method => {
                method.color = "red"
                var bin = method.bin.split("")
                bin.splice(4, 0, " ")
                bin = bin.join("")
                method.bin = bin
                return method
            })
        setSections([{
            id: "root",
            data: paymentMethods
        }])
    }

    isFocused = useIsFocused()
    useEffect(() => {
        getData()
    }, [isFocused])


    const renderItem = ({ item: paymentMethod }) => {
        return (
            <View style={styles.cellContainer}>
                <TouchableOpacity style={styles.cellContent}>
                    <View style={{flexShrink:1}}>
                        <Text style={styles.cellTitle}>{paymentMethod.payment_method.name}</Text>
                        <Text style={styles.cellSubtitle}>{paymentMethod.payment_method.issuer.name}</Text>
                    </View>
                    <View style={styles.cellTrailer}>
                        <View style={{backgroundColor: apiSession.colorForPaymentMethod(paymentMethod), ...styles.binContainer}}>
                            <Text style={styles.binText}>{paymentMethod.bin}</Text>
                        </View>
                        <View>
                            <Image style={styles.cellArrow} source={require("../../../assets/glyphs/arrow.png")} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.separator}></View>
            </View>
        )
    }

    const newButtonOnPress = () => {
        console.log("navigating")
        navigation.navigate('NewPaymentMethod')
    }

    const renderSectionHeader = section => {
        return (
            <View style={styles.cellContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>{sections[0].data.length} card{sections[0].data.length == 1 ? "" : "s"}</Text>
                    <TouchableOpacity onPress={newButtonOnPress}>
                        <Text style={styles.newButtonText}>New</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator}></View>
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
        
        <SectionList
            sections={sections}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
        />
        
        {/* <View style={styles.buttonGroup}>
        <Button title="Add Credit Card" onPress={() => {
            navigation.navigate('NewPaymentMethod')
        }} />
        <Button title="View All Cards" onPress={() => {
            navigation.navigate('EditWallet')
        }} />
        </View>
        
        <FlatList
        data={creditCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Card Type: {item.cardType}</Text>
            <Text style={styles.cardText}>Card Number: **** **** **** {item.cardNumber.slice(-4)}</Text>
            </View>
            )}
        /> */}
        </View>
        );
    };
    
    const styles = StyleSheet.create({
        separator: {
            height: 1,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            // marginLeft: 24,
            // marginRight: 24,
        },
        container: {
            backgroundColor: "white",
            flex: 1
        },
        cellContainer: {
            paddingLeft: 24,
            paddingRight: 24,
        },
        headerContainer: {
            paddingTop: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8
        },
        headerTitle: {
            fontSize: 16,
            fontWeight: "bold",
            color: "gray"
        },
        newButtonText: {
            fontSize: 16,
            color: "rgba(0, 122, 255, 1.0)"
        },
        separator: {
            height: 1,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
        },
        cellTitle: {
            fontSize: 16,
            fontWeight: "bold",
            // flexWrap: "wrap",
            flexShrink: 1,
            // flex: 1,
            marginBottom: 2
        },
        cellSubtitle: {
            fontSize: 16
        },
        cellContent: {
            paddingTop: 16,
            paddingBottom: 16,
            flexDirection: "row",
            justifyContent: "space-between"
        },
        cellTrailer: {
            flexDirection: "row",
            gap: 10,
            paddingLeft: 12,
            alignItems: "center"
        },
        binContainer: {
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 6,
            paddingRight: 6,
            borderRadius: 6
        },
        binText: {
            fontSize: 17,
            fontFamily: "Courier New",
            fontWeight: "bold",
            color: "white"
        },
        cellArrow: {
            height: 14,
            aspectRatio: 1,
            marginLeft: 2,
            opacity: 0.35
        }
    });
    
    export default WalletScreen;
    