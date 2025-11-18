import moment from "moment";
import { EDateFormatSubmit } from "../enums/common";

export function getPreviousMonthDate(date: Date | string): string {
  const d = new Date(date);
  d.setMonth(d.getMonth() - 1);
  return moment(d).format(EDateFormatSubmit.YYYYMMDD);
}