// @ts-ignore
import DateTime from 'luxon/src/datetime.js';

// Get date url at 23:59:59 EST each day
export const getUrlDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
}-${date.getDate() < 9 ? '0' + (date.getDate() + 1) : date.getDate() + 1}T23%3A59%3A59%2B07%3A00`
}

const MS_PER_DAY = 24 * 60 * 60000;
export const getUrlDatesForDailyProgress = () => {
    const today = new Date(Date.now());
    const daysTilMonday = (today.getDay() - 1) == -1 ? 6 : (today.getDay() - 1);
    const monday = new Date(today.valueOf() - (daysTilMonday * MS_PER_DAY));
    const urlDates = [];
    let currentDate = monday;
    for(let i = 0; i < 7; i++) {
        urlDates.push(getUrlDate(currentDate));
        currentDate = new Date(currentDate.valueOf() + MS_PER_DAY);
    }

    return urlDates;
}

export const getUrlDatesForWeeklyProgress = () => {
    const today = new Date(Date.now());
    const urlDates = [];
    for(let i = 0; i < 4; i++) {
        urlDates.push(getUrlDate(new Date(today.valueOf() - 7 * MS_PER_DAY * i)));
    }
    return urlDates;
}

export const getUrlDateForMonthlyProgress = () => {
    const today = new Date(Date.now());
    return getUrlDate(today);
}

export const getWeekNumbersForWeeklyProgress = () => {
    // @ts-ignore
    const todayWeekNumber = DateTime.now().weekNumber;
    let urlDates = [];
    for(let i = 0; i < 4; i++) {
        urlDates.push(todayWeekNumber - i);
    }
    urlDates = urlDates.reverse();
    return urlDates;
}

export const getUrlIndexFromDay = (day: number) => {
    return day - 1 == -1 ? 6 : day - 1;
}