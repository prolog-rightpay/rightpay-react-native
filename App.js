// App.js
import React, { useContext } from 'react';
import { SessionProvider } from './src/SessionContext';
import MainComponent from './src/MainComponent';

const App = () => {
  return (
    <SessionProvider>
      <MainComponent />
    </SessionProvider>
  );
};
export default App;
