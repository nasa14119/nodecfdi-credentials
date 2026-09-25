import forge from '@vilic/node-forge';
import Key from '#src/internal/key';
import { KeyType } from '#src/internal/key_type';
export default class PublicKey extends Key {
    constructor(source) {
        const dataObject = PublicKey.callOnPublicKeyWithContents((publicKey) => {
            const pem = forge.pki.publicKeyToPem(publicKey);
            const data = {};
            data.bits = publicKey.n.bitLength();
            data.key = pem;
            data[KeyType.RSA] = publicKey;
            data.type = KeyType.RSA;
            return data;
        }, source);
        super(dataObject);
    }
    /**
     *
     * @param callableFunction - Function to call and inject content
     * @param _publicKeyContents - PublicKey content
     *
     * @throws Error when Cannot open public key
     */
    static callOnPublicKeyWithContents(callableFunction, _publicKeyContents) {
        let pubKey;
        let latestError = '';
        try {
            const certPem = forge.pki.certificateFromPem(_publicKeyContents);
            pubKey = certPem.publicKey;
        }
        catch (error) {
            latestError = `Cannot open public key: ${error.message}`;
            pubKey = undefined;
        }
        if (!pubKey) {
            try {
                pubKey = forge.pki.publicKeyFromPem(_publicKeyContents);
            }
            catch (error) {
                latestError = `Cannot open public key: ${error.message}`;
                pubKey = undefined;
            }
        }
        if (!pubKey) {
            throw new Error(latestError);
        }
        return callableFunction(pubKey);
    }
    /**
     * Verify the signature of some data
     *
     * @param data - Input data
     * @param signature - Target signature
     * @param algorithm - Algorithm to be used
     */
    verify(data, signature, algorithm = 'sha256') {
        return this.callOnPublicKey((publicKey) => {
            try {
                const sig = forge.md[algorithm].create();
                sig.update(data);
                return publicKey.verify(sig.digest().bytes(), signature);
            }
            catch (error) {
                throw new Error(`Verify error ${error.message}`);
            }
        });
    }
    /**
     * Run a Callable function with this public key opened
     *
     * @param callableFunction - Function to call and inject content
     */
    callOnPublicKey(callableFunction) {
        return PublicKey.callOnPublicKeyWithContents(callableFunction, this.publicKeyContents());
    }
}
