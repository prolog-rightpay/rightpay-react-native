import Realm from 'realm';

export default class RealmAccount extends Realm.Object {
    static schema = {
        name: "Account",
        properties: {
            id: "string",
            email: "string",
            firstName: "string",
            lastName: "string",
            dateCreated: "date",
            sessionToken: "string?",
        },
        primaryKey: "id"
    }
};
