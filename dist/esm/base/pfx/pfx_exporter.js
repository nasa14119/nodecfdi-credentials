import forge from '@vilic/node-forge';
export default class PfxExporter {
    _credential;
    constructor(credential) {
        this._credential = credential;
    }
    getCredential() {
        return this._credential;
    }
    export(passPhrase, algorithm) {
        const pfx = this.getPfxFromCredential(passPhrase, algorithm);
        return forge.asn1.toDer(pfx).getBytes();
    }
    exportToBase64(passPhrase, algorithm) {
        return forge.util.encode64(this.export(passPhrase, algorithm));
    }
    getPfxFromCredential(passPhrase, algorithm) {
        try {
            const privateKey = forge.pki.decryptRsaPrivateKey(this._credential.privateKey().pem(), this._credential.privateKey().passPhrase());
            const certificate = forge.pki.certificateFromPem(this._credential.certificate().pem());
            return forge.pkcs12.toPkcs12Asn1(privateKey, [certificate], passPhrase, { algorithm });
        }
        catch {
            throw new Error(`Cannot export credential with certificate ${this._credential.certificate().serialNumber().bytes()}`);
        }
    }
}
