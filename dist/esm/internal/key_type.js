export const KeyType = {
    RSA: 'RSA',
    DSA: 'DSA',
    ECDSA: 'ECDSA',
};
export class KeyTypeEnum {
    type;
    constructor(rawType) {
        const type = rawType === '' ? 'RSA' : rawType;
        if (!(type in KeyType)) {
            throw new Error('Index Not Found');
        }
        this.type = type;
    }
    isRSA() {
        return this.type === KeyType.RSA;
    }
    /* istanbul ignore next */
    isDSA() {
        return this.type === KeyType.DSA;
    }
    /* istanbul ignore next */
    isECDSA() {
        return this.type === KeyType.ECDSA;
    }
    value() {
        return this.type;
    }
}
