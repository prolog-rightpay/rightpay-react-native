// App.js
import React, { useContext } from 'react';
import { SessionProvider } from './src/SessionContext';
import MainComponent from './src/MainComponent';

import LocalAccountContext from './src/db/schema/LocalAccount'
const {RealmProvider} = LocalAccountContext

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
    