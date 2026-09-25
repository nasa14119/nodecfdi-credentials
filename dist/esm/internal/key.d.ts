import DataArray from '#src/internal/data_array';
import { KeyTypeEnum } from '#src/internal/key_type';
declare const Key_base: import("ts-mixer/dist/types/types.js").Class<any[], DataArray, typeof DataArray>;
export default class Key extends Key_base {
    private typeKey?;
    constructor(dataArray: Record<string, unknown>);
    get type(): KeyTypeEnum;
    parsed(): Record<string, unknown>;
    publicKeyContents(): string;
    numberOfBits(): number;
    typeData(): Record<string, unknown>;
    isType(type: string): boolean;
}
export {};
