// App.js
import React, { useContext } from 'react';
import Realm from 'realm';
import { createRealmContext } from '@realm/react';
import { SessionProvider } from './src/SessionContext';
import MainComponent from './src/MainComponent';
import RealmAccount from './src/db/schema/Account';

const realmConfig = {
  schema: [RealmAccount],
}

const {RealmProvider, useRealm, useObject, useQuery} = createRealmContext(realmConfig);

const App = () => {
  return (
    <RealmProvider>
      <SessionProvider>
        <MainComponent />
      </SessionProvider>
    </RealmProvider>
  );
};
export default App;
