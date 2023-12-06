import { React, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SectionList, Button } from 'react-native';
import { getIssuersPaymentMethods, getPaymentMethodFromBin } from '../../api/wallet/paymentMethod';

const header = {
    id: "header",
    data: [],
    header: true
}

const footerSection = {
    id: "other",
    name: "Other",
    footer: true,
    data: [
        {
            id: "other2",
            name: "I don't see my card",
            footer: true
        }
    ]
}

const ItemSeparator = () => <View style={styles.itemSeparator} />;
const SectionSeparator = () => <View style={styles.sectionSeparator} />;

const SelectPaymentMethodScreen = ({ navigation, route }) => {
    const [data, setData] = useState([header, footerSection]);

    const bin = route.params?.data?.bin

    useEffect(() => {
        getIssuersPaymentMethods(null)
        .then(methods => {
            const newData = methods["data"]["issuers"].map(item => {
                
                item.data = item.payment_methods.map(paymentMethod => {
                    paymentMethod.issuer = {
                        name: item.name,
                        id: item.id
                    }
                    return paymentMethod
                })
                delete item.payment_methods
                return item
            })

            // now get bin
            getPaymentMethodFromBin(null, bin)
            .then(issuer => {
                // console.log(issuer.data)
            })
            .catch(err => {
                console.log(err)
            })

            setData([header, ...newData, footerSection])
        })
        .catch(err => {
            console.log(err.request)
        })
    }, [])

    return (
        <View style={styles.container}>
            <SectionList
                stickySectionHeadersEnabled={false}
                sections={data}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                if (item.footer) {
                                    return
                                }
                                navigation.navigate("ConfirmPaymentMethod", { data: { bin: bin, paymentMethod: item, issuer: item.issuer } })
                            }}    
                        >
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={styles.itemSeparator} />
                    </View>
                )}
                renderSectionHeader={({section}) => {
                    if (section.header) {
                        return (
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerText}>Select your card from the list of supported cards in RightPay</Text>
                            </View>
                        )
                    } else {
                        return (
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionText}>{section.name}</Text>
                            </View>
                        )
                    }
                    
                }}
                renderSectionFooter={_ => (
                    <View style={styles.footerContainer}></View>
                )}
                SectionSeparatorComponent={SectionSeparator}
            />
        </View>
    )
}
export default SelectPaymentMethodScreen

const styles = StyleSheet.create({
    headerContainer: {
        marginLeft: 24,
        marginRight: 24,
        marginTop: 16
    },
    headerText: {
        color: "gray",
        fontSize: 18
    },
    container: {
        backgroundColor: "white",
        flex: 1
    },
    text: {
        fontSize: 18,
        marginBottom: 12,
        color: "gray",
        marginTop: 16,
        marginLeft: 24,
        marginRight: 24
    },
    footerContainer: {
        height: 12
    },
    sectionContainer: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        paddingBottom: 4
    },
    itemContainer: {
        
    },
    itemTextContainer: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 12,
        paddingBottom: 12
    },
    sectionText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray",
    },
    itemText: {
        fontSize: 16
    },
    itemSeparator: {
        height: 1,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        marginLeft: 24,
        marginRight: 24,
    },
    sectionSeparator: {
        
    }
})
