import Certificate from '#src/base/certificate';
import PrivateKey from '#src/base/private_key';
import { type Algorithm } from '#src/types';
export default class Credential {
    private readonly _certificate;
    private readonly _privateKey;
    /**
     * Credential constructor
     *
     * @param certificate - Certificate Instance
     * @param privateKey - PrivateKey instance
     * @throws Exception Certificate does not belong to private key
     */
    constructor(certificate: Certificate, privateKey: PrivateKey);
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
    static create(certificateContents: string, privateKeyContents: string, passPhrase: string): Credential;
    certificate(): Certificate;
    privateKey(): PrivateKey;
    rfc(): string;
    legalName(): string;
    isFiel(): boolean;
    isCsd(): boolean;
    /**
     * Sign string data by provider algorithm
     *
     * @param data - input data
     * @param algorithm - algorithm to be used
     * @returns binary string signature
     */
    sign(data: string, algorithm?: Algorithm): string;
    /**
     * Verify string data is signed by current private key
     *
     * @param data - Original string data
     * @param signature - binary string signature
     * @param algorithm - Algorithm to be used
     */
    verify(data: string, signature: string, algorithm?: Algorithm): boolean;
}
