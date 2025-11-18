export const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && !isNaN(value);
};

export const isNumeric = (value: unknown): boolean => {
  return value !== null && value !== "" && !isNaN(Number(value));
};

export const toNumber = (value?: unknown, defaultValue: number = 0): number => {
  let n: number;

  if (isNumber(value)) {
    n = value;
  } else if (isNumeric(value)) {
    n = Number(value);
  } else {
    return defaultValue;
  }

  return Number.isInteger(n) ? n : parseFloat(n.toFixed(2));
};

export const toInt = (value: any, defaultValue: number = 0): number => {
  const n = parseInt(value, 10);
  return isNaN(n) ? defaultValue : n;
}
