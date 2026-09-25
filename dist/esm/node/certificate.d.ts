import CertificateBase from '#src/base/certificate';
import LocalFileOpen from '#src/internal/local_file_open';
declare const Certificate_base: import("ts-mixer/dist/types/types.js").Class<any[], CertificateBase & LocalFileOpen, typeof CertificateBase & typeof LocalFileOpen>;
export default class Certificate extends Certificate_base {
    /**
     * Create a Certificate object by opening a local file
     * The content file can be a certificate format X.509 PEM, X.509 DER or X.509 DER base64
     *
     * @param filename - file name to be read
     *
     * This function only works in Node.js.
     */
    static openFile(filename: string): Certificate;
}
export {};
