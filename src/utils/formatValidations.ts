import { RegisterOptions } from "react-hook-form";
import { ERegExp } from "../enums/common";
import locales from "../locales";
import moment from "moment";

const { helper } = locales["vi"];

export const validateRules = {
  required: {
    required: helper.required,
  },

  requiredWithCondition: (
    condition: boolean,
    message = helper.required
  ): RegisterOptions => ({
    validate: (value) => {
      if (condition && (value === undefined || value === null || value === '')) {
        return message; 
      }
      return true;
    },
  }),

  stringLength: (min?: number, max?: number): RegisterOptions => {
    const rules: RegisterOptions = {};

    if (min !== undefined) {
      rules.minLength = {
        value: min,
        message: helper.minLength(min),
      };
    }

    if (max !== undefined) {
      rules.maxLength = {
        value: max,
        message: helper.maxLength(max),
      };
    }

    return rules;
  },

  numberRange: (min?: number, max?: number, shortMessage = false, messageMin?: string, messageMax?: string): RegisterOptions => {
    const rules: RegisterOptions = {
      validate: (value) => {
        if (value === undefined || value === null || value === '') return true;

        const numberValue = Number(value);
        if (isNaN(numberValue)) {
          return helper.validNumber;
        }

        if (min !== undefined && numberValue < min) {
          return messageMin || (shortMessage ? helper.shortMin(min) : helper.min(min));
        }
        
        if (max !== undefined && numberValue > max) {
          return messageMax || (shortMessage ? helper.shortMax(max) : helper.max(max));
        }

        return true;
      },
    };

    return rules;
  },

  pattern: (regex: RegExp, message = helper.pattern): RegisterOptions => ({
    pattern: {
      value: regex,
      message: message,
    },
  }),

  notEmptyString: (value: string) => (typeof value === "string" && value.trim().length > 0 ? true : helper.required),

  minDate: (min: Date): RegisterOptions => ({
    validate: (value) => {
      if (!value) return true;
      const dateValue = new Date(value);
      return dateValue >= min || helper.minDate(min);
    },
  }),

  maxDate: (max: Date): RegisterOptions => ({
    validate: (value) => {
      if (!value) return true;
      const dateValue = new Date(value);
      return dateValue <= max || helper.maxDate(max);
    },
  }),

  rangeDate: (
    min?: Date,
    max?: Date,
    messageMin?: string,
    messageMax?: string
  ): RegisterOptions => {
    const rules: RegisterOptions = {
      validate: (value) => {
        if (!value) return true;

        const dateValue = moment(value);
        if (!dateValue.isValid()) {
          return helper.invalidDate;
        }
        if (min && dateValue.isBefore(moment(min), "day")) {
          return messageMin || helper.minDate(min);
        }

        if (max && dateValue.isAfter(moment(max), "day")) {
          return messageMax || helper.maxDate(max);
        }
        return true;
      },
      valueAsDate: true,
    };

    return rules;
  },
  
  noCharSpecial: (): RegisterOptions => ({
    validate: (value) => {
      return ERegExp.NOCHARSPECIAL.test(value)
        ? true
        : helper.noSpecialChar;
    },
  }),

  onlyNumberWithMaxLength: (maxLength = 50): RegisterOptions => ({
    pattern: {
      value: new RegExp(`^\\d{0,${maxLength}}$`),
      message: helper.onlyNumber(maxLength),
    }
  }),

};
