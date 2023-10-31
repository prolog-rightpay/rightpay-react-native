// App.js
import React, { useContext } from 'react';
import Realm from 'realm';
import { createRealmContext } from '@realm/react';
import { SessionProvider } from './src/SessionContext';
import MainComponent from './src/MainComponent';

class Account extends Realm.Object {
  static schema = {
    name: "Account",
    properties: {
      _id: "objectId",
      name: "string"
    },
    primaryKey: "_id",
  }
}

const realmConfig = {
  schema: [Account],
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
