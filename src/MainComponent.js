// App.js
import React, { useContext } from 'react';
import { View } from 'react-native';
import { SessionContext } from './SessionContext';
import NoLoginAppNavigation from './NoLoginAppNavigation'
import AppNavigation from './AppNavigation'

const MainComponent = () => {
  const context = useContext(SessionContext)

  return (
    <View style={{ flex: 1 }}>
    {context.account != undefined ? (
        <AppNavigation />
    ) : (
        <NoLoginAppNavigation />
    )}
    </View>
  );
}
export default MainComponent
