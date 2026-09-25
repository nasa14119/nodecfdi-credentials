import PfxExporterBase from '#src/base/pfx/pfx_exporter';
import LocalFileOpen from '#src/internal/local_file_open';
import { type AlgorithmPfx } from '#src/types';
declare const PfxExporter_base: import("ts-mixer/dist/types/types.js").Class<any[], PfxExporterBase & LocalFileOpen, typeof PfxExporterBase & typeof LocalFileOpen>;
export default class PfxExporter extends PfxExporter_base {
    exportToFile(pfxFile: string, passPhrase: string, algorithm?: AlgorithmPfx): void;
}
export {};
