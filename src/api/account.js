import axios from 'axios'

const endpoint = 'http://localhost:3000/api/v1'

export class RitepayAPIError extends Error {
    constructor(message) {
        super(message)
        this.name = "RitepayAPIError"
    }
}

export class RitepayAPISession {
    constructor() {
        this.sessionToken = null
    }

    async login(email, password) {
        this.sessionToken = "example"
    }

    async logout() {
        // logout
    }

    async getAccount() {
        if (this.sessionToken == null) {
            throw new RitepayAPIError("Missing session token")
        }
        return "placeholder"
    }
}