import { Mixin } from 'ts-mixer';
import PfxReaderBase from '#src/base/pfx/pfx_reader';
import LocalFileOpen from '#src/internal/local_file_open';
export default class PfxReader extends Mixin(PfxReaderBase, LocalFileOpen) {
    static createCredentialFromFile(filename, passPhrase) {
        return PfxReader.createCredentialFromContents(PfxReader.localFileOpen(filename), passPhrase);
    }
}
