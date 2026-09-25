export const isNumber = (n) => (typeof n === 'number' || n instanceof Number || (typeof n === 'string' && !Number.isNaN(n))) &&
    Number.isFinite(n);
export const isScalar = (value) => /boolean|number|string/.test(typeof value);
export const isHexadecimal = (value) => /^[\da-f]+$/i.test(value);
