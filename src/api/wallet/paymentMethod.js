import axios from 'axios'
import endpoint from '../session'

export async function getIssuersPaymentMethods(session) {
    let res
    try {
        res = await axios.get('https://api.userightpay.com/api/v1' + '/wallet/issuer/paymentmethods', {
            headers: {
                // "Authorization": "Bearer " + session.sessionToken
                "Authorization": "Bearer 3f2f16ca1fe9153675fad1843f242ae4c3364e4104e11559"
            }
        })
        return res.data
    } catch (err) {
        throw err
    }
    return res.data
}

export async function getPaymentMethodFromBin(session, bin) {
    let res
    try {
        res = await axios.get('http://localhost:3000/api/v1' + '/wallet/issuer/bin/' + bin, {
            headers: {
                // "Authorization": "Bearer " + session.sessionToken
                "Authorization": "Bearer 3f2f16ca1fe9153675fad1843f242ae4c3364e4104e11559"
            }
        })
        return res.data
    } catch (err) {
        throw err
    }
    return res.data
}
