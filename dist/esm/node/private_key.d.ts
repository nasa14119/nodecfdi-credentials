import PrivateKeyBase from '#src/base/private_key';
import LocalFileOpen from '#src/internal/local_file_open';
declare const PrivateKey_base: import("ts-mixer/dist/types/types.js").Class<any[], PrivateKeyBase & LocalFileOpen, typeof PrivateKeyBase & typeof LocalFileOpen>;
export default class PrivateKey extends PrivateKey_base {
    /**
     * Create a PrivateKey object by opening a local file
     * The content file can be a PKCS#8 DER, PKCS#8 PEM OR PKCS#5 PEM
     *
     * @param filename - file name to be read
     * @param passPhrase - if file is encrypted
     *
     * This function only works in Node.js.
     */
    static openFile(filename: string, passPhrase: string): PrivateKey;
}
export {};
