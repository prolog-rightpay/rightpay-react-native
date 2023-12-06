import React, { Component, createContext, useState, useContext, useEffect } from 'react';
import Realm from 'realm'
import { Account, RightPayAPISession } from './api/session'

import LocalAccountContext, {LocalAccount} from './db/schema/LocalAccount'
const {useRealm, useObject, useQuery} = LocalAccountContext

export const SessionContext = createContext();

export const SessionProvider = props => {
    const realm = useRealm()

    const [apiSession, setApiSession] = useState(new RightPayAPISession())
    const [account, setAccount] = useState(null)
    const [databaseConfigured, setDatabaseConfigured] = useState(false)

    var defaultLocalAccount = useObject(LocalAccount, "default")

    useEffect(() => {
        if (defaultLocalAccount) {
            apiSession.sessionToken = defaultLocalAccount.sessionToken

            const account = getLocalAccount(defaultLocalAccount)
            setAccount(account)
        }
        setDatabaseConfigured(true)
    }, [])

    getLocalAccount = defaultLocalAccount => {
        const { id, email, firstName, lastName } = defaultLocalAccount

        const account = new Account()
        account.id  = id
        account.email = email
        account.firstName = firstName
        account.lastName = lastName

        return account
    }

    writeLocalAccount = (account, sessionToken) => {
        return new Promise((resolve, reject) => {
            realm.write(() => {
                const { id, email, firstName, lastName } = account
                realm.create("LocalAccount", {
                    id: id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    sessionToken: sessionToken,
                    type: "default"
                })
                resolve()
            })
        })
    }

    deleteLocalAccount = defaultLocalAccount => {
        return new Promise((resolve, reject) => {
            realm.write(() => {
                realm.delete(defaultLocalAccount)
            })
        })
    }

    signin = async (email, password) => {
        await apiSession.signin(email, password)
        const account = await apiSession.getAccount()
        
        // setApiSession(apiSession)
        setAccount(account)

        try {
            await writeLocalAccount(account, apiSession.sessionToken)
        } catch (err) {
            console.log(err)
        }
        
    }

    signup = async (email, password, firstName, lastName) => {
        await apiSession.signup(email, password, firstName, lastName)
    }

    signout = async () => {
        await apiSession.signout()

        setApiSession(new RightPayAPISession())
        setAccount(null)

        await deleteLocalAccount(defaultLocalAccount)
        defaultLocalAccount = null
    }

    return (
        <SessionContext.Provider
            value={{
                apiSession: apiSession,
                account: account,

                signin: signin,
                signup: signup,
                signout: signout,

                databaseConfigured: databaseConfigured
            }}
        >
            {props.children}
            </SessionContext.Provider>
    )
}
