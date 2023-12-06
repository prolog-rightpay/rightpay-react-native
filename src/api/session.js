import axios from 'axios'

// export const endpoint = 'https://api.userightpay.com/api/v1'
export const endpoint = 'http://localhost:3000/api/v1'

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

    colorForPaymentMethod = (m) => {
        if (m.payment_method) {
            m.id = m.payment_method.id
        }
        if (m.id == "a09ef51d-25dd-4a46-95cd-a23cf6a3cb4b") {
            //plat
            return "#949494"
        } else if (m.id == "74ffa306-1832-44c5-a2f4-6769ea69fb14") {
            //gold
            return "#FFDA5D"
        } else if (m.id == "2176ac69-eb95-44b9-b855-f4092ed220ef" || m.id == "193dc079-f5ca-41cc-9523-b72094210625") {
            // amex blue cash
            return "#293A62"
        } else if (m.id == "42abd04c-e86c-4049-9fdd-a1e03e9db947") {
            // chase freedom
            return "#639AFF"
        } else if (m.issuer_id == "fe363431-58d4-478c-a4a3-4bd9a51b1179") {
            // capital one
            return "#2B2B2B"
        } else if (m.issuer_id == "522703c1-00a0-421f-b1d7-d7da77be2b81") {
            // boa
            return "#FF4C4C"
        } else if (m.issuer_id == "5fcd6109-098e-439d-a414-50aa08bf5786") {
            // citi
            return "#014684"
        } else if (m.issuer_id == "b932c1a8-2adf-495f-9936-f1416ccce70e") {
            // discover
            return "#F68221"
        } else if (m.issuer_id == "ce6dd56d-f6a5-46cf-b558-956de3102922") {
            // wells fargo
            return "#D71E28"
        } else if (m.issuer_id == "71a73963-1d00-478f-9185-786f21b6e898") {
            // us bank
            return "#112379"
        } else {
            return "#639AFF"
        }
    }

    getPaymentMethods = async () => {
        let res
        try {
            res = await axios.get(endpoint + '/account/wallet', {
                headers: {
                    "Authorization": "Bearer " + this.sessionToken
                }
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
            return data.data.payment_methods
        } else {
            throw new RightPayAPIError(data.message)
        }
    }

    newPaymentMethod = async (paymentMethodId, bin) => {
        let res
        try {
            res = await axios.post(endpoint + '/account/wallet/new', {
                global_payment_method_id: paymentMethodId,
                bin: bin
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.sessionToken
                }
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

    async rewardsSearch(locationType, query) {
        let res
        try {
            res = await axios.get(endpoint + '/account/rewards/search/' + locationType + '/' + query, {
                headers: {
                    "Authorization": "Bearer " + this.sessionToken
                }
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
            return data.data.matching_rewards
        } else {
            throw new RightPayAPIError(data.message)
        }
    }

}