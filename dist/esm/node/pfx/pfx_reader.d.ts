import PfxReaderBase from '#src/base/pfx/pfx_reader';
import LocalFileOpen from '#src/internal/local_file_open';
import type Credential from '#src/node/credential';
declare const PfxReader_base: import("ts-mixer/dist/types/types.js").Class<any[], PfxReaderBase & LocalFileOpen, typeof PfxReaderBase & typeof LocalFileOpen>;
export default class PfxReader extends PfxReader_base {
    static createCredentialFromFile(filename: string, passPhrase: string): Credential;
}
export {};
