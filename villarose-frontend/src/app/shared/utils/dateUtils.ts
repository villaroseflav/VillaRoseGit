export const getMonthOfDate = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month, 1);
};

export const getWeekOfDate = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

export const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysOffset =
    (date.getTime() - firstDayOfYear.getTime()) / millisecondsPerDay;
  return Math.floor((daysOffset + firstDayOfYear.getDay() + 6) / 7);
};

export const getTomorrowsDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

export const getToday = () => {
  const date = new Date();
  date.setDate(date.getDate());
  return date;
};

export const getYesterdaysDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

export const formatDate = (date: Date) => {
  date = new Date(date);
  const year = date.getFullYear();

  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`;
};

export const formatString = (date: string) => {
  let asDate = getDateFromString(date);
  return formatDate(asDate);
}

export const formatDateArray = (dateArray: string) => {
  let asDate = dateArrayToStringDate(dateArray);
  return formatString(asDate);
}

export const formatTimeArray = (dateArray: string) => {
  const [,,, hour, minute] = dateArray;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export const getDateFromString = (date: string) => {
  const dateParts = date.split('-');
  return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
};

export const formatDateEur = (date: String) => {
  const dateParts = date.split('-');

  return `${+dateParts[2] < 10 ? `0${+dateParts[2]}` : +dateParts[2]}/${
    +dateParts[1] < 10 ? `0${+dateParts[1]}` : +dateParts[1]
  }/${+dateParts[0]}`;
};

export const getDayFromDate = (date: Date) => {
  return date.getDay();
};

export const getDayMonthFromDate = (date: Date) => {
  return `${date.getDate()}-${date.getMonth()+1}`;
}

export const numberToDay = (day: number) => {
  switch (day) {
    case 1:
      return 'MONDAY';
    case 2:
      return 'TUESDAY';
    case 3:
      return 'WEDNESDAY';
    case 4:
      return 'THURSDAY';
    case 5:
      return 'FRIDAY';
    case 6:
      return 'SATURDAY';
    case 0:
      return 'SUNDAY';
    default:
      return '';
  }
};

export const dayToNumber = (day: string) => {
  switch (day) {
    case 'MONDAY':
      return 1;
    case 'TUESDAY':
      return 2;
    case 'WEDNESDAY':
      return 3;
    case 'THURSDAY':
      return 4;
    case 'FRIDAY':
      return 5;
    case 'SATURDAY':
      return 6;
    case 'SUNDAY':
      return 0;
    default:
      return -1;
  }
};

export const dateArrayToStringDate = (dateArray: string) => {
  const [year, month, day] = dateArray;
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
};

export const dateArrayToFormatString = (dateArray: string) => {
  const [year, month, day] = dateArray;
  return `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year}`;
};

export const getLastDayOfMonth = (year: string, month: string) => {
  return new Date(+year, +month, 0).getDate().toString();
};

export const sortDayOfWeek = (dayOfWeek: object) => {
  const sortedEntries = Object.entries(dayOfWeek).sort((a, b) => {
    const daysOrder = [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ];
    const indexA = daysOrder.indexOf(a[0]);
    const indexB = daysOrder.indexOf(b[0]);

    if (indexA === -1 && indexB === -1) {
      return 0; // Both days are missing, consider them equal
    }
    if (indexA === -1) {
      return 1; // Day A is missing, so B should come first
    }
    if (indexB === -1) {
      return -1; // Day B is missing, so A should come first
    }
    return indexA - indexB; // Compare the indices of both days
  });
  return new Map<string, number>(sortedEntries);
};
