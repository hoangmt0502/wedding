import moment from "moment";

/**
 * Formats a date into 'YYYY-MM-DD' string for input fields.
 * @param {string | Date | null | undefined} date - The date to format
 * @returns {string} Formatted date string or empty string if invalid
 */
export const formatDateForInput = (date: string | Date | null | undefined): string => {
  if (!date) return "";

  // Handle string with '/' format (e.g., "25/03/2023")
  if (typeof date === "string" && date.includes("/")) {
    const [day, month, year] = date.split("/");
    const paddedDay = day.padStart(2, "0");
    const paddedMonth = month.padStart(2, "0");
    const formatted = `${year}-${paddedMonth}-${paddedDay}`;
    
    // Validate the constructed date
    const parsedDate = new Date(formatted);
    return isNaN(parsedDate.getTime()) ? "" : formatted;
  }

  // Handle Date object or ISO string
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? "" : parsedDate.toISOString().split("T")[0];
};

/**
 * Converts a date to a Vietnamese locale string.
 * @param {string | Date | null | undefined} date - The date to convert
 * @returns {string} Formatted date string or "N/A" if invalid
 */
export const convertDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return "";

  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime())
    ? ""
    : parsedDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
};

/**
 * Converts a date to a Vietnamese locale string with time.
 * @param {string | Date | null | undefined} date - The date to convert
 * @returns {string} Formatted date-time string or "N/A" if invalid
 */
export const convertToDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return "";

  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime())
    ? ""
    : parsedDate.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
};


/**
 * Formats a value as Vietnamese currency (VND).
 * @param {number | string | null | undefined} value - The value to format
 * @returns {string} Formatted currency string or "N/A" if invalid
 */
export const formatPrice = (value: number | string | null | undefined): string => {
  if (value == null || (typeof value !== "number" && isNaN(Number(value)))) {
    return "";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Avoid unnecessary decimals for VND
  }).format(Number(value));
};

export function generateRandomCode(length = 9): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateCode(code: string): string {
  const [prefix, numberPart] = code.split('_');
  const number = parseInt(numberPart, 10);
  const nextNumber = number + 1;

  const paddedNumber = nextNumber.toString().padStart(numberPart.length, '0');

  return `${prefix}_${paddedNumber}`;
}

export function renderFieldList<T>(arr: T[], key: keyof T): string {
  return arr.map(item => item[key]).filter(Boolean).join(", ");
}

export const capitalizeEachWordVi = (str: string) => {
  return str
    .toLocaleLowerCase("vi-VN")
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toLocaleUpperCase("vi-VN") + word.slice(1)
    )
    .join(" ");
};

export const monthsCeilPositive = (to: moment.MomentInput) => {
  const now = moment().startOf('day');
  const target = moment(to).endOf('day');

  if (target.isBefore(now)) return 0;

  const diffMonths = target.diff(now, 'months', true);

  if (diffMonths <= 1) return 1;

  return Math.ceil(diffMonths);
};

