import React, { useEffect, useState } from 'react';
import { View, Text, Alert, NetInfo } from 'react-native';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setIsConnected(netInfoState.isConnected);
    };

    const handleConnectivityChange = (state) => {
      setIsConnected(state.isConnected);
    };

    NetInfo.addEventListener('connectionChange', handleConnectivityChange);

    checkInternetConnection(); // Check the initial connection status

    // Cleanup listener on component unmount
    return () => {
      NetInfo.removeEventListener('connectionChange', handleConnectivityChange);
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      // Notify the user when there is no internet connection
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
    }
  }, [isConnected]);

  return (
    <View>
      {isConnected ? (
        <Text>Connected to the Internet</Text>
      ) : (
        <Text>No Internet Connection</Text>
      )}
      {/* Your other components */}
    </View>
  );
};

export default App;
