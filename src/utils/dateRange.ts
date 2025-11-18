import moment from "moment";
import locales from "../locales";

const {common: t_common} = locales['vi']

export const dateRange = (fromKey: string, message?: string, ) => {
  return (value: any, allValues: Record<string, any>) => {
    const fromDate = moment(allValues[fromKey]);
    const toDate = moment(value);

    if (fromDate.isValid() && toDate.isValid() && toDate.isBefore(fromDate, "day")) {
      return message || t_common.errorRangeDate;
    }
    return null;
  };
};