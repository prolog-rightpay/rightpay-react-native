import { React } from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'

const EditWalletScreen = props => {
    return (
        <View style={styles.container}>
          <FlatList
            data={creditCards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.cardContainer}>
                <Text style={styles.cardText}>Card Type: {item.cardType}</Text>
                <Text style={styles.cardText}>Card Number: **** **** **** {item.cardNumber.slice(-4)}</Text>
                <Button title="Remove" onPress={() => removeCreditCard(index)} />
              </View>
            )}
          />
        </View>
    )
}
export default EditWalletScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
    cardContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      shadowOpacity: 0.2,
    },
    cardText: {
      fontSize: 18,
      marginBottom: 12,
      color: '#34495e',
    },
});
