import { Mixin } from 'ts-mixer';
import DataArray from '#src/internal/data_array';
import { KeyTypeEnum } from '#src/internal/key_type';
export default class Key extends Mixin(DataArray) {
    typeKey;
    constructor(dataArray) {
        super();
        this._dataArray = dataArray;
    }
    get type() {
        this.typeKey ??= new KeyTypeEnum(this.extractString('type'));
        return this.typeKey;
    }
    parsed() {
        return this._dataArray;
    }
    publicKeyContents() {
        return this.extractString('key');
    }
    numberOfBits() {
        return this.extractInteger('bits');
    }
    typeData() {
        return this.extractArray(this.type.value());
    }
    isType(type) {
        return this.type.value() === type;
    }
}
