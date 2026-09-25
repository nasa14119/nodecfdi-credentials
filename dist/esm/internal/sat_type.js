export const SatType = {
    FIEL: 'FIEL',
    CSD: 'CSD',
};
export class SatTypeEnum {
    type;
    constructor(type) {
        /* istanbul ignore if -- @preserve */
        if (!(type in SatType)) {
            throw new Error('Index Not Found');
        }
        this.type = type;
    }
    isFiel() {
        return this.type === SatType.FIEL;
    }
    isCsd() {
        return this.type === SatType.CSD;
    }
}
