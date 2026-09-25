export declare const SatType: {
    readonly FIEL: "FIEL";
    readonly CSD: "CSD";
};
export declare class SatTypeEnum {
    private readonly type;
    constructor(type: string);
    isFiel(): boolean;
    isCsd(): boolean;
}
