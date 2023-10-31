import { useRealm } from '@realm/react';
import React, { Component, createContext, useState, useContext } from 'react';
import { RightPayAPISession } from './api/account'

export const SessionContext = createContext();
export class SessionProvider extends Component {
    constructor(props) {
        super(props)

        // this.realm = useRealm()

        this.state = {
            apiSession: new RightPayAPISession(),
            account: null,
            /** Has checked storage for session token? */
            databaseSetup: true
        }
    }

    signin = async (email, password) => {
        const { apiSession } = this.state
        await apiSession.signin(email, password)
        const account = await apiSession.getAccount()

        // AsyncStorage.setItem('sessionToken', apiSession.sessionToken)
        // this.realm.write(() => {
        //     this.realm.create("Account", {
        //         id: account.id,
        //         email: account.email,
        //         firstName: account.firstName,
        //         lastName: account.lastName,
        //         dateCreated: account.dateCreated,
        //         sessionToken: apiSession.sessionToken
        //     })
        // })
        
        this.setState({ apiSession })
        this.setState({ account })
    }

    signup = async (email, password, firstName, lastName) => {
        const { apiSession } = this.state
        await apiSession.signup(email, password, firstName, lastName)
    }

    signout = async () => {
        const { apiSession } = this.state
        await apiSession.signout()
        this.setState({ apiSession: new RightPayAPISession(), account: null })
    }

    render() {
        const { children } = this.props
        return (
            <SessionContext.Provider
                value={{
                    apiSession: this.state.apiSession,
                    account: this.state.account,
                    signin: this.signin,
                    signup: this.signup,
                    signout: this.signout,
                    databaseSetup: this.state.databaseSetup
                }}
            >
                {children}
            </SessionContext.Provider>
        )
    }
}
