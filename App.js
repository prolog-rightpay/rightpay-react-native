// App.js
import React, { useContext } from 'react';
import { View } from 'react-native';
import { SessionProvider } from './SessionContext';
import MainComponent from './MainComponent';

const App = () => {
  return (
    <SessionProvider>
      <MainComponent />
    </SessionProvider>
  );
};
export default App;
