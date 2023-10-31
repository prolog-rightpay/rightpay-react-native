import React, { useContext } from 'react';
import { SafeAreaView, View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { SessionContext } from '../../SessionContext';
 
const settingSections = [
    {
        title: "Account",
        data: [
            { id: "CurrentUser", title: "Signed in as " },
            { id: "SignOut", title: "Sign Out" }
        ]
    }
]

const SettingsScreen = () => {

    const context = useContext(SessionContext)

    const handleItemPress = item => {
        switch (item.id) {
        case "SignOut":
            context.signout()
            return
        }
    }

    const renderSectionHeader = ({section: {title}}) => (
        <View>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    )

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleItemPress(item)}
        >
            <Text style={styles.settingTitle}>{renderText(item)}</Text>
        </TouchableOpacity>
    )

    const renderText = item => {
        switch (item.id) {
        case "CurrentUser":
            return "Signed in as " + context.account.email
        default:
            return item.title
        }
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={settingSections}
                keyExtractor={section => section.title}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      settingItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      settingTitle: {
        fontSize: 16,
        // fontWeight: 'bold',
      },
      sectionTitle: {
        fontSize: 16,
        paddingLeft: 16,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 4,
        color: "gray"
      },
      settingDescription: {
        fontSize: 14,
        color: '#888',
      },
})

export default SettingsScreen
