import axios from 'axios'

const endpoint = 'http://localhost:3000/api/v1'

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

    async login(email, password) {
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

    async logout() {
        // logout
    }

    /**
     * Get the account of the session.
     * @returns {Account}
     * @throws `RightPayAPIError`, use `.message` for a user-facing error.
     */
    async getAccount() {
        if (this.sessionToken == null) {
            throw new RightPayAPIError("Missing session token")
        }
        return "placeholder"
    }
}