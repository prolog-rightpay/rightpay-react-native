// App.js
import React, { useContext } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { SessionContext } from './SessionContext';
import NoLoginAppNavigation from './NoLoginAppNavigation'
import AppNavigation from './AppNavigation'

const MainComponent = () => {
  const context = useContext(SessionContext)

  if (context.databaseSetup) {
    return (
      <View style={{ flex: 1 }}>
      {context.account != undefined ? (
          <AppNavigation />
      ) : (
          <NoLoginAppNavigation />
      )}
      </View>
    );
  } else {
    return (
      <SafeAreaView><Text>Loading database...</Text></SafeAreaView>
    )
  }
  
}
export default MainComponent
