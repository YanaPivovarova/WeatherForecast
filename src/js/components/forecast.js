import template from '../../templates/weather.hbs';

export default class Forecast {
    constructor() {
        this.apiUrl = 'http://api.openweathermap.org/data/2.5/forecast';
        this.appId = 'a1893053fd0088472e3911e004f32afc';
        this.city = 'London';
        this.daysAmount = 4;
        this.periodsAmount = 8;
        this.data = {};

        this.requestData();
    }

    requestData() {
        const url = `${this.apiUrl}?q=${this.city}&appid=${this.appId}&units=metric`;

        let promise = fetch(url).then(response => response.json());

        promise.then((response) => {
            this.data = response;

            const forecastList = this.getForecastList();
            this.createHTML(forecastList);
        });

    }

    getForecastList() {
        return this.data.list.filter((item, index) => {
            return index % this.periodsAmount === 0 && index < this.periodsAmount * this.daysAmount;
        });
    }

    createHTML(forecastList) {
        const container = document.getElementById("weather-template");

        container.innerHTML = template({ forecastList });
    }
}