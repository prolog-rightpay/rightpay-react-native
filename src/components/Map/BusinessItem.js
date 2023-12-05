import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export const BusinessItem = ({ name, type, distance, rewards, onPress }) => {
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={{ fontSize: 16 }}>{type || "unknown type"}</Text>
                        <Text style={styles.distanceText}>{distance}</Text>
                    </View>
                    
                </View>
                    {rewards > 0 && (<View style={styles.rewardsCount}>
                        <Text style={styles.rewardsCountText}>{rewards}</Text>
                    </View>
                    )}
            </TouchableOpacity>
            <View style={styles.separator}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 12,
        paddingBottom: 12,
        // borderBottomColor: "gray",
        // borderBottomWidth: 1,
        flexDirection: "row",
        backgroundColor: "white"
    },
    textContainer: {
        flexDirection: "column",
        gap: 2
    },
    rewardsCount: {
        borderRadius: 13,
        backgroundColor: "rgba(52, 199, 89, 1.0)",
        height: 26,
        width: 26,
        alignItems: "center",
        justifyContent: "center"
    },
    rewardsCountText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
    separator: {
        height: 1,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        marginLeft: 24,
        marginRight: 24,
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    distanceText: {
        marginLeft: 10,
        fontSize: 14,
        color: "gray"
    }
})
