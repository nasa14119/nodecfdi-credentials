import forge from '@vilic/node-forge';
import { DateTime } from 'luxon';
import PublicKey from '#src/base/public_key';
import DataArray from '#src/internal/data_array';
import Rfc4514 from '#src/internal/rfc4514';
import { SatType, SatTypeEnum } from '#src/internal/sat_type';
import PemExtractor from '#src/pem_extractor';
import SerialNumber from '#src/serial_number';
export default class Certificate extends DataArray {
    /** String PEM contents including headers */
    _pem;
    /** String RFC as parsed from subject/uniqueIdentifier */
    _rfc;
    /** String Legal name as parsed from subject/uniqueIdentifier */
    _legalName;
    /** Parsed serial number */
    _serialNumber;
    /** Parsed public key */
    _publicKey;
    constructor(contents) {
        super();
        if (contents === '') {
            throw new SyntaxError('Create certificate from empty contents');
        }
        let pem = new PemExtractor(contents).extractCertificate();
        if (pem === '') {
            pem = Certificate.convertDerToPem(contents);
        }
        let parsed;
        try {
            parsed = forge.pki.certificateFromPem(pem);
        }
        catch (error) {
            throw new Error(`Cannot parse X509 certificate from contents ${error.message}`);
        }
        this._pem = pem;
        this._dataArray = {
            version: parsed.version,
            serialNumber: parsed.serialNumber,
            subject: parsed.subject,
            issuer: parsed.issuer,
            extensions: parsed.extensions,
            validity: parsed.validity,
        };
        this._rfc = forge.util.decodeUtf8((this.subjectData({ type: '2.5.4.45' })?.value).split(' ')[0]);
        this._legalName = this.subjectData({ type: '2.5.4.41' })?.value;
        this._dataArray.hash = parsed.issuer.hash;
        this._dataArray.signatureTypeLN = parsed.signature;
    }
    /**
     * Convert X.509 DER base64 or X.509 DER to X509 PEM
     *
     * @param contents - DER Content
     */
    static convertDerToPem(contents) {
        let finalContent = contents;
        // Effectively compare that all the content is base64, if it isn't then encode it
        if (finalContent !== forge.util.encode64(forge.util.decode64(finalContent))) {
            finalContent = forge.util.encode64(finalContent);
        }
        return [
            '-----BEGIN CERTIFICATE-----\n',
            `${finalContent.match(/.{1,64}/g)?.join('\n')}\n`,
            '-----END CERTIFICATE-----',
        ].join('');
    }
    pem() {
        return this._pem;
    }
    pemAsOneLine() {
        const normaliceEnds = this.pem().replaceAll('\r\n', '\n');
        const allLines = normaliceEnds.split(/\n/);
        const filterLines = allLines.filter((s) => /^(?:(?!-).)*$/.test(s));
        return filterLines.join('');
    }
    parsed() {
        return this._dataArray;
    }
    rfc() {
        return this._rfc;
    }
    legalName() {
        return this._legalName;
    }
    branchName() {
        return this.subjectData({ shortName: 'OU' })?.value ?? '';
    }
    name() {
        return forge.util.decodeUtf8(`/CN=${this.subjectData({ shortName: 'CN' })?.value ?? ''}`);
    }
    subject() {
        return this.extractArray('subject');
    }
    subjectData(key) {
        return this.subject().getField(key);
    }
    hash() {
        return this.extractString('hash');
    }
    issuer() {
        return this.extractArray('issuer');
    }
    issuerData(key) {
        return this.issuer().getField(key);
    }
    version() {
        return this.extractString('version');
    }
    serialNumber() {
        if (!this._serialNumber) {
            const serial = this.extractString('serialNumber');
            this._serialNumber = this.createSerialNumber(serial, '');
        }
        return this._serialNumber;
    }
    validity() {
        return this.extractArray('validity');
    }
    validFrom() {
        return this.validity().notBefore;
    }
    validTo() {
        return this.validity().notAfter;
    }
    validFromDateTime() {
        return DateTime.fromJSDate(this.validFrom());
    }
    validToDateTime() {
        return DateTime.fromJSDate(this.validTo());
    }
    signatureTypeLN() {
        return this.extractString('signatureTypeLN');
    }
    extensions() {
        return this._dataArray.ext;
    }
    publicKey() {
        this._publicKey ??= new PublicKey(this.pem());
        return this._publicKey;
    }
    satType() {
        if (this.branchName() === '') {
            return new SatTypeEnum(SatType.FIEL);
        }
        return new SatTypeEnum(SatType.CSD);
    }
    validOn(datetime) {
        let dateTime = datetime;
        dateTime ??= DateTime.now();
        return (dateTime.toMillis() >= this.validFromDateTime().toMillis() &&
            dateTime.toMillis() <= this.validToDateTime().toMillis());
    }
    issuerAsRfc4514() {
        const issuer = {};
        const rawIssuer = this.issuer();
        for (const line of Object.values(rawIssuer.attributes)) {
            /* istanbul ignore if: on certs not pass but library check for undefined -- @preserve */
            if (!line.shortName && !line.type) {
                continue;
            }
            const keyIssuer = line.shortName ?? line.type;
            issuer[keyIssuer] = line.value;
        }
        return new Rfc4514().escapeRecord(issuer);
    }
    createSerialNumber(hexadecimal, decimal) {
        if (hexadecimal !== '') {
            return SerialNumber.createFromHexadecimal(hexadecimal);
        }
        if (decimal !== '') {
            // In some cases openssl report serialNumberHex on serialNumber
            if (decimal.slice(0, 2).toLowerCase() === '0x'.toLowerCase()) {
                return SerialNumber.createFromHexadecimal(decimal.slice(2));
            }
            return SerialNumber.createFromDecimal(decimal);
        }
        throw new Error('Certificate does not contain a serial number');
    }
}
