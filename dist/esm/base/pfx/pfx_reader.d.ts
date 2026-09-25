import forge from '@vilic/node-forge';
import Credential from '#src/base/credential';
export default class PfxReader {
    static createCredentialFromContents(contents: string, passPhrase: string): Credential;
    static loadPkcs12(contents: string, password?: string): {
        cert: forge.pki.Certificate;
        pKey: forge.pki.PrivateKey;
    };
}
