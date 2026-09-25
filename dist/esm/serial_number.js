import { BaseConverter } from '@nodecfdi/base-converter';
import forge from '@vilic/node-forge';
import { isHexadecimal } from '#src/utils/utilities';
/**
 * This class is used to load hexadecimal or decimal data as a certificate serial number.
 * It has its own class because SOLID and is easy to test in this way.
 * It is not intended to use in general.
 */
export default class SerialNumber {
    /** Hexadecimal string representation */
    _hexadecimal;
    constructor(hexa) {
        let hexadecimal = hexa;
        if (hexadecimal === '') {
            throw new Error('The hexadecimal string is empty');
        }
        if ('0x'.toLowerCase() === hexadecimal.slice(0, 2).toLowerCase()) {
            hexadecimal = hexadecimal.slice(2);
        }
        hexadecimal = hexadecimal.toUpperCase();
        if (!isHexadecimal(hexadecimal)) {
            throw new Error('The hexadecimal string contains invalid characters');
        }
        this._hexadecimal = hexadecimal;
    }
    static createFromHexadecimal(hexadecimal) {
        return new SerialNumber(hexadecimal);
    }
    static createFromDecimal(decString) {
        const hexadecimal = BaseConverter.createBase36().convert(decString, 10, 16);
        return new SerialNumber(hexadecimal);
    }
    static createFromBytes(input) {
        const hexadecimal = forge.util.bytesToHex(input);
        return new SerialNumber(hexadecimal);
    }
    hexadecimal() {
        return this._hexadecimal;
    }
    bytes() {
        return forge.util.hexToBytes(this._hexadecimal);
    }
    decimal() {
        return BaseConverter.createBase36().convert(this.hexadecimal(), 16, 10);
    }
    bytesArePrintable() {
        return /^[\u0020-\u007E]*$/.test(this.bytes());
    }
}
