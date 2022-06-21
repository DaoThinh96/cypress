// eslint-disable-next-line import/no-extraneous-dependencies
import {When, Then} from 'cypress-cucumber-preprocessor/steps';

let baseUrl;
switch (Cypress.env('ENV')) {
    case 'qa':
        baseUrl = 'https://mmr.manheim.man-qa1.com/mmr';
        break;
    case 'uat':
        baseUrl = 'https://mmr.manheim.man-uat.com/mmr';
        break;
    case 'local':
        baseUrl = 'http://localhost:8080';
        break;
    default:
        baseUrl = 'https://mmr.manheim.com/mmr';
        break;
}

When('I make get_valuation_search_bff {string} request with {string} and expect response code is {int}', (method, params, code) => {
    cy.task('getValue', {key: 'session'}).then((session) => {
        cy.request({
            method,
            url: `${baseUrl}/getValuation/search/year/2021/make/TOYOTA/model/COROLLA/style/4D HATCHBACK NIGHTSHADE?${params}&include=retail,historical,forecast`,
            headers: {
                cookie: session,
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response).property('status').to.equal(code);
            if (code === 405) {
                expect(response).property('error').to.have.text('Method Not Allowed');
            } else {
                cy.task('setValue', {key: 'body_get_valuation_search_bff', value: response.body});
            }
        });
    });
});

When('I make get_valuation_search_bff GET request with {string} and expect response code is {int} and error is {string}', (invalidUrl, code, error) => {
    cy.task('getValue', {key: 'session'}).then((session) => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/${invalidUrl}`,
            headers: {
                cookie: session,
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response).property('status').to.equal(code);
            expect(response).property('statusText').to.equal(error);
        });
    });
});

Then('I expect to see data between get_valuation_search_bff and valuation_search are matching', () => {
    cy.task('getValue', {key: 'body_get_valuation_search_bff'}).then((bodyGetValuationSearchBff) => {
        cy.task('getValue', {key: 'body_valuation_search'}).then((bodyValuationsSearch) => {
            expect(bodyGetValuationSearchBff.count).to.eq(bodyValuationsSearch.count);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < bodyGetValuationSearchBff.count; i++) {
                expect(bodyGetValuationSearchBff.items[i].href).to.eqls(bodyValuationsSearch.items[i].href);
                expect(bodyGetValuationSearchBff.items[i].valuationsId).to.eqls(bodyValuationsSearch.items[i].valuationsId);
                expect(bodyGetValuationSearchBff.items[i].description).to.eqls(bodyValuationsSearch.items[i].description);
                expect(bodyGetValuationSearchBff.items[i].adjustedPricing).to.eqls(bodyValuationsSearch.items[i].adjustedPricing);
                expect(bodyGetValuationSearchBff.items[i].wholesale).to.eqls(bodyValuationsSearch.items[i].wholesale);
                expect(bodyGetValuationSearchBff.items[i].retail).to.eqls(bodyValuationsSearch.items[i].retail);
                expect(bodyGetValuationSearchBff.items[i].historicalAverages).to.eqls(bodyValuationsSearch.items[i].historicalAverages);
                expect(bodyGetValuationSearchBff.items[i].forecast).to.eqls(bodyValuationsSearch.items[i].forecast);
                expect(bodyGetValuationSearchBff.items[i].averageOdometer).to.eqls(bodyValuationsSearch.items[i].averageOdometer);
                expect(bodyGetValuationSearchBff.items[i].odometerUnits).to.eqls(bodyValuationsSearch.items[i].odometerUnits);
                expect(bodyGetValuationSearchBff.items[i].averageGrade).to.eqls(bodyValuationsSearch.items[i].averageGrade);
                expect(bodyGetValuationSearchBff.items[i].currency).to.eqls(bodyValuationsSearch.items[i].currency);
                expect(bodyGetValuationSearchBff.items[i].sampleSize).to.eqls(bodyValuationsSearch.items[i].sampleSize);
                expect(bodyGetValuationSearchBff.items[i].samples).to.eqls(bodyValuationVin.items[i].samples);
            }
        });
    });
});
