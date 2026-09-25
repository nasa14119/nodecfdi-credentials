import { DateTime } from 'luxon';
import { isNumber, isScalar } from '#src/utils/utilities';
export default class DataArray {
    extractScalar(key, valueDefault) {
        const value = this._dataArray[key] ?? valueDefault;
        if (isScalar(value)) {
            return value;
        }
        return valueDefault;
    }
    extractString(key) {
        return this.extractScalar(key, '').toString();
    }
    extractInteger(key) {
        const value = this.extractScalar(key, 0);
        if (isNumber(value)) {
            return Math.floor(Number(value));
        }
        return 0;
    }
    extractArray(key) {
        const data = this._dataArray[key] ?? null;
        if (!(typeof data === 'object' && data !== null)) {
            return {};
        }
        return data;
    }
    extractArrayStrings(key) {
        const array = {};
        for (const [name, value] of Object.entries(this.extractArray(key))) {
            if (isScalar(value)) {
                array[name] = value.toString();
            }
        }
        return array;
    }
    extractDateTime(key) {
        return DateTime.fromMillis(this.extractInteger(key) * 1000);
    }
}
