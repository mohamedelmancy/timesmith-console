import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
declare var require: any;
var CryptoJS = require('crypto-js');
import {environment} from '../../../environments/environment';
var SecureStorage = require('secure-web-storage')
function getCurrentStorageType() {
    const rememberMe = String(localStorage.getItem('remember'));
    return JSON.parse(rememberMe) === false ? sessionStorage : localStorage
}

var storage = new SecureStorage(getCurrentStorageType(), {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, environment.secret_key);

        return key?.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, environment.secret_key);

        data = data?.toString();

        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, environment.secret_key);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
});

export class secureStorage {
    private static currentStorage = storage;

    static refreshStorage() {
        this.currentStorage.storage = getCurrentStorageType();
    }

    static setItem(key, value): any {
        this.refreshStorage();
        this.currentStorage.setItem(key, value);
    }

    static getItem(key): any {
        this.refreshStorage();
        return this.currentStorage.getItem(key);
    }

    static removeItem(key): any {
        this.refreshStorage();
        return this.currentStorage.removeItem(key);
    }

    static clearAll() {
        this.refreshStorage();
        this.currentStorage.clear();
        localStorage.clear();
        sessionStorage.clear();
    }

    static encryptItem(item) {
        return AES.encrypt(JSON.stringify(item), environment.secret_key).toString();
    }

    static decryptItem(item) {
        try {
            return JSON.parse(AES.decrypt(item, environment.secret_key).toString(encUTF8));
        } catch (e) {
            // incorrect/missing secret, return the encrypted data instead
            return item;
        }
    }

    constructor() {
        // ls.config.encrypt = true;
    }
}
