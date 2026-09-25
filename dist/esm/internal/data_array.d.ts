import { DateTime } from 'luxon';
export default abstract class DataArray {
    protected _dataArray: Record<string, unknown>;
    protected extractScalar(key: string, valueDefault: string | number | boolean): string | number | boolean;
    protected extractString(key: string): string;
    protected extractInteger(key: string): number;
    protected extractArray(key: string): Record<string, unknown>;
    protected extractArrayStrings(key: string): Record<string, string>;
    protected extractDateTime(key: string): DateTime;
}
