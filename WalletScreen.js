import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, StyleSheet } from 'react-native';

const WalletScreen = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({ cardNumber: '', cardType: '' });
  const [isViewingCards, setIsViewingCards] = useState(false);

  // Function to add a new credit card
  const addCreditCard = () => {
    // Validate card details here 
    if (newCard.cardNumber && newCard.cardType) {
      setCreditCards([...creditCards, newCard]);
      setIsAddingCard(false);
      setNewCard({ cardNumber: '', cardType: '' });
    } else {
      alert('Please enter valid card details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Wallet</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add Credit Card" onPress={() => setIsAddingCard(true)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="View All Cards" onPress={() => setIsViewingCards(true)} />
      </View>

      {/* List of credit cards */}
      <FlatList
        data={creditCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Card Type: {item.cardType}</Text>
            <Text style={styles.cardText}>Card Number: {item.cardNumber}</Text>
            {/* Add edit and delete options here */}
          </View>
        )}
      />

      {/* Modal for adding a new credit card */}
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
          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={addCreditCard} />
            <Button title="Cancel" onPress={() => setIsAddingCard(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for viewing all credit cards */}
      <Modal visible={isViewingCards}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>All Credit Cards</Text>
          <Button title="Close" onPress={() => setIsViewingCards(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  cardText: {
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default WalletScreen;
