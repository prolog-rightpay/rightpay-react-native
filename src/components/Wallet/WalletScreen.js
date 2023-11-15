import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, StyleSheet } from 'react-native';

const WalletScreen = ({ navigation }) => {
  const [creditCards, setCreditCards] = useState([]);

  return (
    <View style={styles.container}>

      <View style={styles.buttonGroup}>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
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
  buttonGroup: {
    height: 82,  // adjust this value to your preference
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
},

});

export default WalletScreen;
