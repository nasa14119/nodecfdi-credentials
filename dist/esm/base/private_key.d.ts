import forge from '@vilic/node-forge';
import type Certificate from '#src/base/certificate';
import PublicKey from '#src/base/public_key';
import Key from '#src/internal/key';
import { type Algorithm } from '#src/types';
export default class PrivateKey extends Key {
    /** String PEM contents of private key  */
    private readonly _pem;
    /** String password of private key */
    private readonly _passPhrase;
    /** Public key extracted from private key **/
    private _publicKey?;
    /**
     * Private key constructor
     *
     * @param source - can be a PKCS#8 DER, PKCS#8 PEM or PKCS#5 PEM
     * @param passPhrase - if empty asume unencrypted/plain private key
     */
    constructor(source: string, passPhrase: string);
    /**
     * Convert PKCS#8 DER to PKCS#8 PEM
     *
     * @param contents -
     * @param isEncrypted -
     */
    static convertDerToPem(contents: string, isEncrypted: boolean): string;
    pem(): string;
    passPhrase(): string;
    publicKey(): PublicKey;
    /**
     * Sign string data by provider algorithm
     *
     * @param data - input data
     * @param algorithm - algorithm to be used
     * @returns binary string signature
     */
    sign(data: string, algorithm?: Algorithm): string;
    belongsTo(certificate: Certificate): boolean;
    belongsToPEMCertificate(certificate: string): boolean;
    callOnPrivateKey<T>(callableFunction: (prv: forge.pki.rsa.PrivateKey) => T): T;
    changePassPhrase(newPassPhrase: string): PrivateKey;
}
