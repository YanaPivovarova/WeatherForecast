const WEEK_DAYS = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday",
};

function getOrdinalSuffix(number) {
    if (number > 3 && number < 21) return 'th';

    switch (number % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

export default function (milliSeconds) {
    if (milliSeconds) {
        const date = new Date(milliSeconds);
        const dateNow = new Date();
        const day = date.getDate();
        const suffix = getOrdinalSuffix(day);
        const weekDay = dateNow.getDay() === date.getDay() ? 'Today' : WEEK_DAYS[date.getDay()];

        return `${weekDay} ${day}${suffix}`;
    }
    return new Date();
};