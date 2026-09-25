import PublicKeyBase from '#src/base/public_key';
import LocalFileOpen from '#src/internal/local_file_open';
declare const PublicKey_base: import("ts-mixer/dist/types/types.js").Class<any[], PublicKeyBase & LocalFileOpen, typeof PublicKeyBase & typeof LocalFileOpen>;
export default class PublicKey extends PublicKey_base {
    /**
     * Read file and return PublicKey instance
     *
     * @param filename - file name to be read
     * @returns PublicKey instance
     *
     * This function only works in Node.js.
     */
    static openFile(filename: string): PublicKey;
}
export {};
