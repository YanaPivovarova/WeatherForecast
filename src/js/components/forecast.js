import template from '../../templates/forecast.hbs';
import parseUrl from '../utils/parseUrl';

class Forecast {
    constructor(city, $element) {
        this.$element = $element;
        this.apiUrl = 'http://api.openweathermap.org/data/2.5/forecast';
        this.appId = 'a1893053fd0088472e3911e004f32afc';
        this.city = city;
        this.daysAmount = 4;
        this.periodsAmount = 8;
        this.data = {};
        this.errorMessage = "";
        this.requestData();
    }

    handleSearch() {
        const $inputButton = this.$element.querySelector('[js-buttonSearch]');
        const $inputSearch = this.$element.querySelector('[js-inputSearch]');

        $inputButton.addEventListener('click', () => {
            this.search();
        }, false);

        $inputSearch.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                this.search();
            }
        }, false);
    }

    search() {
        const $inputSearch = this.$element.querySelector('[js-inputSearch]');

        if ($inputSearch.value) {
            this.city = $inputSearch.value;
            this.requestData();
        }
    }

    requestData(city = this.city) {
        const url = `${this.apiUrl}?q=${city}&appid=${this.appId}&units=metric`;

        fetch(url).then(response => response.json()).then((response) => {
            if (!response.message) {
                this.data = response;
                this.errorMessage = '';

                const forecastList = this.getForecastList();
                this.createHTML(forecastList);
            } else {
                this.errorMessage = 'Sorry, ' + response.message;
                this.createHTML([]);
            }
        });
    }

    getForecastList() {
        return this.data.list.filter((item, index) => {
            return index % this.periodsAmount === 0 && index < this.periodsAmount * this.daysAmount;
        });
    }

    createHTML(forecastList) {
        this.$element.innerHTML = template({ forecastList: forecastList, errorMessage: this.errorMessage });
        this.handleSearch();
    }
}

function init() {
    const queryParams = parseUrl();
    const $container = document.getElementById("weather-template");

    if (queryParams && queryParams.city) {
        queryParams.city.forEach(c => {
            const $section = document.createElement('section');

            $container.appendChild($section);
            new Forecast(c, $section);
        });
    } else {
        const $section = document.createElement('section');

        $container.appendChild($section);
        new Forecast('London', $section);
    }
}

init();