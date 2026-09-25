/**
 * This class is used to load hexadecimal or decimal data as a certificate serial number.
 * It has its own class because SOLID and is easy to test in this way.
 * It is not intended to use in general.
 */
export default class SerialNumber {
    /** Hexadecimal string representation */
    private readonly _hexadecimal;
    constructor(hexa: string);
    static createFromHexadecimal(hexadecimal: string): SerialNumber;
    static createFromDecimal(decString: string): SerialNumber;
    static createFromBytes(input: string): SerialNumber;
    hexadecimal(): string;
    bytes(): string;
    decimal(): string;
    bytesArePrintable(): boolean;
}
