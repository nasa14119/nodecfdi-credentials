import forge from '@vilic/node-forge';
import { DateTime } from 'luxon';
import PublicKey from '#src/base/public_key';
import DataArray from '#src/internal/data_array';
import { SatTypeEnum } from '#src/internal/sat_type';
import SerialNumber from '#src/serial_number';
export default class Certificate extends DataArray {
    /** String PEM contents including headers */
    private readonly _pem;
    /** String RFC as parsed from subject/uniqueIdentifier */
    private readonly _rfc;
    /** String Legal name as parsed from subject/uniqueIdentifier */
    private readonly _legalName;
    /** Parsed serial number */
    private _serialNumber?;
    /** Parsed public key */
    private _publicKey?;
    constructor(contents: string);
    /**
     * Convert X.509 DER base64 or X.509 DER to X509 PEM
     *
     * @param contents - DER Content
     */
    static convertDerToPem(contents: string): string;
    pem(): string;
    pemAsOneLine(): string;
    parsed(): Record<string, unknown>;
    rfc(): string;
    legalName(): string;
    branchName(): string;
    name(): string;
    subject(): forge.pki.Certificate['subject'];
    subjectData(key: string | forge.pki.CertificateFieldOptions): forge.pki.CertificateField | undefined;
    hash(): string;
    issuer(): forge.pki.Certificate['issuer'];
    issuerData(key: string | forge.pki.CertificateFieldOptions): forge.pki.CertificateField;
    version(): string;
    serialNumber(): SerialNumber;
    validity(): forge.pki.Certificate['validity'];
    validFrom(): Date;
    validTo(): Date;
    validFromDateTime(): DateTime;
    validToDateTime(): DateTime;
    signatureTypeLN(): string;
    extensions(): Record<string, unknown>[];
    publicKey(): PublicKey;
    satType(): SatTypeEnum;
    validOn(datetime?: DateTime): boolean;
    issuerAsRfc4514(): string;
    protected createSerialNumber(hexadecimal: string, decimal: string): SerialNumber;
}
