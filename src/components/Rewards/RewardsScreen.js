import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, SectionList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SessionContext } from '../../SessionContext';
 
var business = {
    // id: "qqq",
    // name: "Business Name",
    // address: "Business Address"
}

// const rewards = [
//     {
//         paymentMethod: {
//             name: "Chase Freedom",
//             id: "xxx",
//             bin: "234319",
//             color: "#639AFF"
//         },
//         id: "aaa",
//         type: "percentage",
//         percentage: 0.05,
//         locationType: "category",
//         locationCategory: "gas station"
//     },
//     {
//         paymentMethod: {
//             name: "American Express Platinum",
//             id: "yyy",
//             bin: "112233",
//             color: "#565656"
//         },
//         id: "bbb",
//         type: "percentage",
//         percentage: 0.02,
//         locationType: "location",
//         locationName: "Shell"
//     }
// ]

// const rewardsSections = [
//     {
//         id: "header",
//         title: "Name of Business",
//         data: []
//     },
//     {
//         id: "rewards",
//         title: "Available Rewards",
//         data: rewards
//     }
// ]

const RewardsScreen = ({ navigation, route }) => {

    const context = useContext(SessionContext)
    const { apiSession } = context

    const { business, rewards: rewardsData } = route.params.data

    // const [business, setBusiness] = useState({})
    // const [rewardsData, setRewardsData] = useState({})
    const [rewardsSection, setRewardsSection] = useState([{id: "header", data: []},{id: "rewards", data: []}])
    

    useEffect(() => {
        navigation.setOptions({ title: business.name })
    }, [])

    /*
            paymentMethod: {
            name: "American Express Platinum",
            id: "yyy",
            bin: "112233",
            color: "#565656"
        },
        id: "bbb",
        type: "percentage",
        percentage: 0.02,
        locationType: "location",
        locationName: "Shell"
        */

    useEffect(() => {
        apiSession.getPaymentMethods()
        .then(paymentMethods => {
            const rewards = rewardsData.map(reward => {
                reward.paymentMethod = paymentMethods.find(p => {
                    return p.payment_method.id == reward.payment_method_id
                })
                return reward
            })
            paymentMethods.forEach(method => {
                var bin = method.bin.split("")
                bin.splice(4, 0, " ")
                bin = bin.join("")
                method.bin = bin
            })

            setRewardsSection([
                { id: "header", data: []},
                {id :"rewards", data: rewards}
            ])
        })
        .catch(err => {
            console.log(err)
        })
        
        // console.log(rewards)
    }, [])
    
    const renderSectionHeader = ({ section: { id } }) => {
        let distance = ""
        if (business.miles < 0.01) {
            distance = `${business?.feet?.toFixed(2)} ft`
        } else {
            distance = `${business?.miles?.toFixed(2)} mi`
        }

        if (id == "header") {
            return (
                <View style={styles.infoContainer}>
                    <Text style={styles.businessTitle}>{ business.name }</Text>
                    <Text style={styles.businessSubtitle}>{ distance }</Text>
                    <ScrollView contentInset={{left: 24, right: 24}} contentOffset={{x: -24}} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.typesContainer}>
                            {business?.types?.map(type => (
                                <View key={type} style={styles.businessPill}>
                                    <Text style={styles.businessPillText}>{type.replace(/_/g, " ")}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    
                </View>
            )
        } else if (id == "rewards") {
            return (
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Available Rewards</Text>
                    </View>
                    <View style={styles.separator}></View>
                </View>
            )
        }
    }

    const renderItem = ({ item: reward }) => {
        return (
            <View>
                <TouchableOpacity style={styles.cellContainer}>
                    <Text style={styles.cellTitle}>{reward.paymentMethod.payment_method.name}</Text>
                    <Text style={styles.cellSubtitle}>
                        <Text style={styles.bold}>{reward.type == "percentage" ? Math.round(reward.percentage * 100) + "%" : "$" + reward.reimburse}</Text> cashback at <Text style={styles.bold}>{reward.condition.location_type == "location" ? reward.condition.location_name : reward.condition.location_category + "s"}</Text></Text>
                    <View style={{backgroundColor: apiSession.colorForPaymentMethod(reward.paymentMethod.payment_method), ...styles.binContainer}}>
                        <Text style={styles.binText}>{reward.paymentMethod.bin}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separator}></View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={rewardsSection}
                keyExtractor={section => section.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={false}
            />
        </View>
    )

}
export default RewardsScreen

const styles = StyleSheet.create({
    bold: {
        fontWeight: "bold"
    },
    container: {
        backgroundColor: "white",
        flex: 1
    },
    businessTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 1,
        marginLeft: 24,
        marginRight: 24
    },
    businessSubtitle: {
        fontSize: 20,
        color: "gray",
        marginBottom: 12,
        marginLeft: 24,
        marginRight: 24
    },
    businessPill: {
        backgroundColor: "rgba(0, 122, 255, 1.0)",
        alignSelf: "flex-start",
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 12,
        marginBottom: 12
    },
    businessPillText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold"
    },
    headerContainer: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 4
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    cellContainer: {
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "space-between",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        paddingBottom: 16,
        // borderBottomColor: "gray",
        // borderBottomWidth: 1,
        // flexDirection: "row",
        backgroundColor: "white"
    },
    infoContainer: {
        paddingTop: 16,
        paddingBottom: 16
    },
    cellTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray",
        marginBottom: 2
    },
    cellSubtitle: {
        fontSize: 16,
        marginBottom: 8
    },
    binContainer: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 5,
        // backgroundColor: "blue",
        alignSelf: "flex-start",
    },
    binText: {
        fontSize: 17,
        fontFamily: "Courier New",
        fontWeight: "bold",
        color: "white"
    },
    separator: {
        height: 1,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        marginLeft: 24,
        marginRight: 24,
    },
    typesContainer: {
        flexDirection: "row",
        gap: 6
    }
})