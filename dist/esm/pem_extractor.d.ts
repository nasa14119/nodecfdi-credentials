export default class PemExtractor {
    private readonly contents;
    constructor(context: string);
    getContents(): string;
    extractCertificate(): string;
    extractPublicKey(): string;
    extractPrivateKey(): string;
    protected extractBase64(raw: string): string;
    protected extractRsaProtected(): string;
    protected normalizeLineEndings(content: string): string;
}
