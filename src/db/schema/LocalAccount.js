import {Realm, createRealmContext} from '@realm/react'

export class LocalAccount extends Realm.Object {
    static schema = {
        name: "LocalAccount",
        properties: {
            id: "string",
            email: "string",
            firstName: "string",
            lastName: "string",
            sessionToken: "string",
            type: "string"
        },
        primaryKey: "type"
    }
};

const config = {
    schema: [LocalAccount],
    path: "rightpay8.realm"
}
export default createRealmContext(config)
