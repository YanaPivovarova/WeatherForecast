export default function (weather) {
    if (weather) {
        return WEATHER_CONDITIONS_CLASSES[weather[0].description.toLowerCase()] || WEATHER_CONDITIONS_CLASSES[weather[0].main.toLowerCase()];
    }
    return '';
};

const WEATHER_CONDITIONS_CLASSES = {
    'clear sky': 'forecast__card_clear-sky',
    'few clouds': 'forecast__card_few-clouds',
    'scattered clouds': 'forecast__card_scattered-clouds',
    'broken clouds': 'forecast__card_broken-clouds',
    'overcast clouds': 'forecast__card_broken-clouds',
    'shower rain': 'forecast__card_shower-rain',
    'rain': 'forecast__card_rain',
    'thunderstorm': 'forecast__card_thunderstorm',
    'snow': 'forecast__card_snow',
    'mist': 'forecast__card_mist'
};