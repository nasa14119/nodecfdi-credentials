import Certificate from '#src/base/certificate';
import PrivateKey from '#src/base/private_key';
export default class Credential {
    _certificate;
    _privateKey;
    /**
     * Credential constructor
     *
     * @param certificate - Certificate Instance
     * @param privateKey - PrivateKey instance
     * @throws Exception Certificate does not belong to private key
     */
    constructor(certificate, privateKey) {
        if (!privateKey.belongsTo(certificate)) {
            throw new Error('Certificate does not belong to private key');
        }
        this._certificate = certificate;
        this._privateKey = privateKey;
    }
    /**
     * Create a Credential object based on string contents
     *
     * The certificate content can be X.509 PEM, X.509 DER or X.509 DER base64
     * The private key content can be PKCS#8 DER, PKCS#8 PEM or PKCS#5 PEM
     *
     * @param certificateContents - content can be X.509 PEM, X.509 DER or X.509 DER base64
     * @param privateKeyContents - content can be PKCS#8 DER, PKCS#8 PEM or PKCS#5 PEM
     * @param passPhrase - password for encrypted key
     */
    static create(certificateContents, privateKeyContents, passPhrase) {
        const certificate = new Certificate(certificateContents);
        const privateKey = new PrivateKey(privateKeyContents, passPhrase);
        return new Credential(certificate, privateKey);
    }
    certificate() {
        return this._certificate;
    }
    privateKey() {
        return this._privateKey;
    }
    rfc() {
        return this._certificate.rfc();
    }
    legalName() {
        return this._certificate.legalName();
    }
    isFiel() {
        return this._certificate.satType().isFiel();
    }
    isCsd() {
        return this._certificate.satType().isCsd();
    }
    /**
     * Sign string data by provider algorithm
     *
     * @param data - input data
     * @param algorithm - algorithm to be used
     * @returns binary string signature
     */
    sign(data, algorithm = 'sha256') {
        return this._privateKey.sign(data, algorithm);
    }
    /**
     * Verify string data is signed by current private key
     *
     * @param data - Original string data
     * @param signature - binary string signature
     * @param algorithm - Algorithm to be used
     */
    verify(data, signature, algorithm = 'sha256') {
        return this._certificate.publicKey().verify(data, signature, algorithm);
    }
}
