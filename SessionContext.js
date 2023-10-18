import React, { Component, createContext, useState, useContext } from 'react';
import { RitepayAPISession } from './src/api/account'

export const SessionContext = createContext();
export class SessionProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            apiSession: null,
            account: null
        }
    }

    login = async (email, password) => {
        const apiSession = new RitepayAPISession()
        await apiSession.login(email, password)
        this.setState({ apiSession })
        const account = await apiSession.getAccount()
        this.setState({ account })
    }

    logout = async () => {
        await apiSession.logout()
        this.setState({ apiSession: null, account: null })
    }

    render() {
        const { children } = this.props
        return (
            <SessionContext.Provider
                value={{
                    apiSession: this.state.apiSession,
                    user: this.state.user,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {children}
            </SessionContext.Provider>
        )
    }
}