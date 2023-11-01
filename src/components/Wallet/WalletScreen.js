import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, StyleSheet } from 'react-native';

const WalletScreen = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({ cardNumber: '', cardType: '' });
  const [isViewingCards, setIsViewingCards] = useState(false);

  const addCreditCard = () => {
    if (newCard.cardNumber && newCard.cardType) {
      setCreditCards([...creditCards, newCard]);
      setIsAddingCard(false);
      setNewCard({ cardNumber: '', cardType: '' });
    } else {
      alert('Please enter valid card details.');
    }
  };
  
  const removeCreditCard = (cardIndex) => {
    const updatedCards = creditCards.filter((_, index) => index !== cardIndex);
    setCreditCards(updatedCards);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Wallet</Text>
      <View style={styles.buttonGroup}>
        <Button title="Add Credit Card" onPress={() => setIsAddingCard(true)} />
        <Button title="View All Cards" onPress={() => setIsViewingCards(true)} />
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

      <Modal visible={isAddingCard}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Add Credit Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={newCard.cardNumber}
            onChangeText={(text) => setNewCard({ ...newCard, cardNumber: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Type"
            value={newCard.cardType}
            onChangeText={(text) => setNewCard({ ...newCard, cardType: text })}
          />
          <View style={styles.buttonGroup}>
            <Button title="Add" onPress={addCreditCard} />
            <Button title="Cancel" onPress={() => setIsAddingCard(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={isViewingCards}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>All Credit Cards</Text>
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
          <Button title="Close" onPress={() => setIsViewingCards(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  header: {
    fontSize: 28,
    marginBottom: 30,
    alignSelf: 'center',
    color: '#2c3e50',
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 45,
    width: '85%',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
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
