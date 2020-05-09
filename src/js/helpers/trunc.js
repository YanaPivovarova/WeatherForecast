export default function (number) {
    if (number) {
        return Math.trunc(number);
    }
    return number;
};