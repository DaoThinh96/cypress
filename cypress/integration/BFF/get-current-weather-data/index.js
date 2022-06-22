// eslint-disable-next-line import/no-extraneous-dependencies
import { When, Then } from 'cypress-cucumber-preprocessor/steps';

let baseUrl = 'https://api.openweathermap.org/data/2.5';

When('I make get_current_weather_data {string} request and expect response code is {int}', (method, code) => {
    cy.request({
        method,
        url: `${baseUrl}/weather?lat=35&lon=139&appid=c206132f0c703dab28e5b1c6f6efd7c1`,
        failOnStatusCode: false,
    }).then((response) => {
        expect(response).property('status').to.equal(code);
        if (code === 405) {
            expect(response).property('error').to.have.text('Method Not Allowed');
        } else {
            cy.task('setValue', { key: 'body_get_current_weather_data', value: response.body });
        }
    });
});

When('I make get_current_weather_data GET request without appid and expect response code is 401', (method, code) => {
    cy.request({
        method,
        url: `${baseUrl}/weather?lat=35&lon=139`,
        failOnStatusCode: false,
    }).then((response) => {
        expect(response).property('status').to.equal(401);
        expect(response).property('statusText').to.equal('Unauthorized');
    });
});

When('I make get_current_weather_data GET request with {string} and expect response code is {int} and error is {string}', (invalidUrl, code, error) => {
    cy.request({
        method: 'GET',
        url: `${baseUrl}/${invalidUrl}`,
        failOnStatusCode: false,
    }).then((response) => {
        expect(response).property('status').to.equal(code);
        expect(response).property('statusText').to.equal(error);
    });
});

Then('I expect to see data get_current_weather_data', () => {
    cy.task('getValue', { key: 'body_get_current_weather_data' }).then((bodyGetWeatherData) => {
        cy.fixture('get-current-weather-data/get-current-weather-data.json').then((response) => {
            expect(bodyGetWeatherData.coord).to.eqls(response.coord);
            expect(bodyGetWeatherData.weather).to.eqls(response.weather);
            expect(bodyGetWeatherData.main).to.eqls(response.main);
            expect(bodyGetWeatherData.id).to.eqls(response.id);
            expect(bodyGetWeatherData.name).to.eqls(response.name);
        })

    });
});
