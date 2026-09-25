export default class PemExtractor {
    contents;
    constructor(context) {
        this.contents = context;
    }
    getContents() {
        return this.contents;
    }
    extractCertificate() {
        return this.extractBase64('CERTIFICATE');
    }
    extractPublicKey() {
        return this.extractBase64('PUBLIC KEY');
    }
    extractPrivateKey() {
        // See https://github.com/kjur/jsrsasign/wiki/Tutorial-for-PKCS5-and-PKCS8-PEM-private-key-formats-differences
        // PKCS#8 plain private key
        let extracted = this.extractBase64('PRIVATE KEY');
        if (extracted !== '') {
            return extracted;
        }
        // PKCS#5 plain private key
        extracted = this.extractBase64('RSA PRIVATE KEY');
        if (extracted !== '') {
            return extracted;
        }
        // PKCS#5 encrypted private key
        extracted = this.extractRsaProtected();
        if (extracted !== '') {
            return extracted;
        }
        // PKCS#8 encrypted private key
        return this.extractBase64('ENCRYPTED PRIVATE KEY');
    }
    extractBase64(raw) {
        let type = raw;
        type = type.replaceAll(/[!$()*+./:<=>?[\\\]^{|}-]/g, String.raw `\$&`);
        const pattern = `^-----BEGIN ${type}-----\r?\n([A-Za-z0-9+/=]+\r?\n)+-----END ${type}-----\r?\n?$`;
        const matches = new RegExp(pattern, 'm').exec(this.getContents());
        return this.normalizeLineEndings(matches ? matches[0] : '');
    }
    extractRsaProtected() {
        const pattern = '^-----BEGIN RSA PRIVATE KEY-----\r?\nProc-Type: .+\r?\nDEK-Info: .+\r?\n\r?\n(?:[A-Za-z0-9+/=]+\r?\n)+-----END RSA PRIVATE KEY-----\r?\n?$';
        const matches = new RegExp(pattern, 'm').exec(this.getContents());
        return this.normalizeLineEndings(matches ? matches[0] : '');
    }
    normalizeLineEndings(content) {
        return content.replaceAll('\r\n', '\n');
    }
}
