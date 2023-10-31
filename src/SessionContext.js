import React, { Component, createContext, useState, useContext } from 'react';
import { RightPayAPISession } from './api/account'

export const SessionContext = createContext();
export class SessionProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            apiSession: new RightPayAPISession(),
            account: null
        }
    }

    signin = async (email, password) => {
        const { apiSession } = this.state
        await apiSession.signin(email, password)
        this.setState({ apiSession })
        const account = await apiSession.getAccount()
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
                    signout: this.signout
                }}
            >
                {children}
            </SessionContext.Provider>
        )
    }
}
