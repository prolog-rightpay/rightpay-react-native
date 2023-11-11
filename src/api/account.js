import axios from 'axios'

const endpoint = 'https://api.userightpay.com/api/v1'

export class Account {
    /** @type {string} Internal ID of account. */
    id = null
    /** @type {string} Email address of account. */
    email = null
    /** @type {string?} First name of user. */
    firstName = null
    /** @type {string?} Last name of user. */
    lastName = null
    /** @type {date} Date that the account was registered. */
    dateCreated = null
}

export class RightPayAPIError extends Error {
    constructor(message) {
        super(message)
        this.name = "RightPayAPIError"
    }
}

export class RightPayAPISession {
    constructor() {
        this.sessionToken = null
    }

    async signup(email, password, firstName, lastName) {
        let res
        try {
            res = await axios.post(endpoint + '/signup', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })
        } catch (err) {
            const message = err.response.data?.message
            if (message) {
                throw new RightPayAPIError(message)
            } else {
                throw err
            }
        }
        const { data } = res
        if (!data.success) {
            throw new RightPayAPIError(data.message)
        }
    }

    async signin(email, password) {
        let res
        try {
            res = await axios.post(endpoint + '/signin', {
                email: email,
                password: password
            })
        } catch (err) {
            const message = err.response.data?.message
            if (message) {
                throw new RightPayAPIError(message)
            } else {
                throw err
            }
        }
        const { data } = res
        if (data.success) {
            this.sessionToken = data.data.session_token
        } else {
            throw new RightPayAPIError(data.message)
        }
    }

    async signout() {
        // logout
    }

    /**
     * Get the account of the session.
     * @returns {Account}
     * @throws `RightPayAPIError`, use `.message` for a user-facing error.
     */
    async getAccount() {
        let res
        try {
            res = await axios.get(endpoint + '/account', {
                headers: {
                    "Authorization": "Bearer " + this.sessionToken
                }
            })
        } catch (err) {
            throw err
        }
        const { data } = res
        if (data.success) {
            const account = new Account()
            account.id = data.data.account.id
            account.email = data.data.account.email
            account.firstName = data.data.account.first_name
            account.lastName = data.data.account.last_name
            account.dateCreated = data.data.account.date_created
            return account
        } else {
            throw new RightPayAPIError(data.message)
        }
    }
}