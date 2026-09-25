import type Credential from '#src/base/credential';
import { type AlgorithmPfx } from '#src/types';
export default class PfxExporter {
    private readonly _credential;
    constructor(credential: Credential);
    getCredential(): Credential;
    export(passPhrase: string, algorithm?: AlgorithmPfx): string;
    exportToBase64(passPhrase: string, algorithm?: AlgorithmPfx): string;
    private getPfxFromCredential;
}
