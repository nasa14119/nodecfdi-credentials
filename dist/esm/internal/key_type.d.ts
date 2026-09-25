export declare const KeyType: {
    readonly RSA: "RSA";
    readonly DSA: "DSA";
    readonly ECDSA: "ECDSA";
};
export declare class KeyTypeEnum {
    private readonly type;
    constructor(rawType: string);
    isRSA(): boolean;
    isDSA(): boolean;
    isECDSA(): boolean;
    value(): string;
}
