import { parse, format as dateFnsFormat } from "date-fns";

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";
const APP_FORMAT_DATE = "yyyy-MM-dd";
const EPOCH_DATE = new Date(0);

export const format = (date: string): string => {
    const parsedDate = parse(date, ISO_FORMAT, EPOCH_DATE);
    return dateFnsFormat(parsedDate, APP_FORMAT_DATE);
};
