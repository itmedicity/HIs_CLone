import moment from "moment";

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const CELL_SIZE = 34;
export const TIME_ROW_HEIGHT = 26;

export const buildCalendarWeeks = (viewMonth) => {
  const start = moment(viewMonth).startOf("month").startOf("week");
  const end = moment(viewMonth).endOf("month").endOf("week");
  const weeks = [];
  const cursor = start.clone();
  while (cursor.isSameOrBefore(end, "day")) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(cursor.clone());
      cursor.add(1, "day");
    }
    weeks.push(week);
  }
  return weeks;
};
