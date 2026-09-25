import forge from '@vilic/node-forge';
import PublicKey from '#src/base/public_key';
import Key from '#src/internal/key';
import { KeyType } from '#src/internal/key_type';
import PemExtractor from '#src/pem_extractor';
export default class PrivateKey extends Key {
    /** String PEM contents of private key  */
    _pem;
    /** String password of private key */
    _passPhrase;
    /** Public key extracted from private key **/
    _publicKey;
    /**
     * Private key constructor
     *
     * @param source - can be a PKCS#8 DER, PKCS#8 PEM or PKCS#5 PEM
     * @param passPhrase - if empty asume unencrypted/plain private key
     */
    constructor(source, passPhrase) {
        super({});
        if (source === '') {
            throw new SyntaxError('Private key is empty');
        }
        const pemExtractor = new PemExtractor(source);
        let pem = pemExtractor.extractPrivateKey();
        if (pem === '') {
            // It could be a DER content, convert to PEM
            const convertSourceIsEncrypted = passPhrase !== '';
            pem = PrivateKey.convertDerToPem(source, convertSourceIsEncrypted);
        }
        this._pem = pem;
        this._passPhrase = passPhrase;
        this._dataArray = this.callOnPrivateKey((privateKey) => {
            const data = {};
            const pubKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
            data.bits = privateKey.n.bitLength();
            data.key = forge.pki.publicKeyToPem(pubKey);
            data[KeyType.RSA] = privateKey;
            data.type = KeyType.RSA;
            return data;
        });
    }
    /**
     * Convert PKCS#8 DER to PKCS#8 PEM
     *
     * @param contents -
     * @param isEncrypted -
     */
    static convertDerToPem(contents, isEncrypted) {
        const privateKeyName = isEncrypted ? 'ENCRYPTED PRIVATE KEY' : 'PRIVATE KEY';
        return [
            `-----BEGIN ${privateKeyName}-----\n`,
            `${forge.util
                .encode64(contents)
                .match(/.{1,64}/g)
                .join('\n')}\n`,
            `-----END ${privateKeyName}-----`,
        ].join('');
    }
    pem() {
        return this._pem;
    }
    passPhrase() {
        return this._passPhrase;
    }
    publicKey() {
        this._publicKey ??= new PublicKey(this.publicKeyContents());
        return this._publicKey;
    }
    /**
     * Sign string data by provider algorithm
     *
     * @param data - input data
     * @param algorithm - algorithm to be used
     * @returns binary string signature
     */
    sign(data, algorithm = 'sha256') {
        if (data.length === 0) {
            throw new Error('Cannot sign data: empty signature');
        }
        return this.callOnPrivateKey((privateKey) => {
            try {
                const sig = forge.md[algorithm].create();
                sig.update(data);
                return privateKey.sign(sig);
            }
            catch {
                /* istanbul ignore next: really dificult fail sign process -- @preserve */
                throw new Error('Cannot sign data: empty signature');
            }
        });
    }
    belongsTo(certificate) {
        return this.belongsToPEMCertificate(certificate.pem());
    }
    belongsToPEMCertificate(certificate) {
        const pubKey = forge.pki.publicKeyFromPem(this.publicKeyContents()); // Or certificate
        const x = forge.pki.certificateFromPem(certificate);
        const certPubKey = x.publicKey;
        return JSON.stringify(certPubKey) === JSON.stringify(pubKey);
    }
    callOnPrivateKey(callableFunction) {
        let privateKey;
        try {
            privateKey = forge.pki.decryptRsaPrivateKey(this._pem, this._passPhrase);
        }
        catch (error) {
            throw new Error(`Cannot open private key: ${error.message}`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Its necesary because forge not break on error.
        if (!privateKey) {
            throw new Error('Cannot open private key: invalid key or password');
        }
        return callableFunction(privateKey);
    }
    changePassPhrase(newPassPhrase) {
        const pem = this.callOnPrivateKey((privateKey) => {
            const rsaPrivateKey = forge.pki.privateKeyToAsn1(privateKey);
            const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaPrivateKey);
            if (newPassPhrase === '') {
                return forge.pki.privateKeyInfoToPem(privateKeyInfo);
            }
            const encryptPrivateKeyInfo = forge.pki.encryptPrivateKeyInfo(privateKeyInfo, newPassPhrase);
            return forge.pki.encryptedPrivateKeyToPem(encryptPrivateKeyInfo);
        });
        return new PrivateKey(pem, newPassPhrase);
    }
}
