// eslint-disable-next-line import/no-extraneous-dependencies
import {Given, When} from 'cypress-cucumber-preprocessor/steps';
import Ajv from 'ajv';
// eslint-disable-next-line import/no-unresolved,import/extensions
// eslint-disable-next-line max-len
const ajv = new Ajv({allErrors: true});

let baseUrl;
switch (Cypress.env('ENV')) {
    case 'qa':
        baseUrl = 'https://integration1.api.manheim.com';
        break;
    case 'local':
        baseUrl = 'https://integration1.api.manheim.com';
        break;
    case 'uat':
        baseUrl = 'https://uat.api.manheim.com';
        break;
    default:
        baseUrl = 'https://api.manheim.com';
        break;
}

Given('I am on MMR page and getting cookie session', () => {
    switch (Cypress.env('ENV')) {
      case 'qa':
        cy.visit('https://members.manheim.man-qa1.com/members/landingPage#/');
        cy.login('manheim-user1');
        cy.visit('https://mmr.manheim.man-qa1.com/?WT.svl=m_uni_hdr_buy&country=US&popup=true&source=man');
        break;
      case 'uat':
        cy.visit('https://members.manheim.man-uat.com/members/landingPage#/');
        cy.login('demodealer');
        cy.visit('https://mmr.manheim.man-uat.com/?WT.svl=m_uni_hdr_buy&country=US&popup=true&source=man');
        break;
      default:
        cy.visit('https://members.manheim.com/members/landingPage#/');
        cy.login('manheim-user1');
        cy.visit('https://mmr.manheim.com/?WT.svl=m_uni_hdr_buy&country=US&popup=true&source=man');
        break;
    }
    cy.task('setValue', { key: 'session', value: cy.getCookies('SESSION') });
});

When('I validate schema {string} of {string} endpoint', (api, endpoint) => {
    // eslint-disable-next-line no-shadow
    cy.task('getValue', {key: `body_${api}`}).then((response) => {
        cy.fixture(`${endpoint}`).then((schema) => {
            const validate = ajv.compile(schema);
            const valid = validate(response);
            if (!valid) {
                cy.log(validate.errors).then(() => {
                    throw new Error('Wrong Schema');
                });
            }
        });
    });
});

When('I make valuations {string} GET request and expect response code is 200', (endpoint) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/valuations/${endpoint}`,
            headers: {
                authorization: `Bearer ${bearerTokenValue}`,
            },
        });
    }).then((response) => {
        expect(response).property('status').to.equal(200);
        cy.task('setValue', {key: `body_valuations_${endpoint}`, value: response.body});
    });
});

When('I make valuations {string} GET request with {string} and expect response code is 200', (endpoint, country) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/valuations/${endpoint}?${country}`,
            headers: {
                authorization: `Bearer ${bearerTokenValue}`,
            },
        });
    }).then((response) => {
        expect(response).property('status').to.equal(200);
        cy.task('setValue', {key: `body_valuations_${endpoint}`, value: response.body});
    });
});

When('I make "valuation_samples_id" GET request with {string} and expect response code is 200', (params) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.task('getValue', {key: 'mid'}).then((mid) => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/valuation-samples/id/${mid}?${params}`,
                headers: {
                    authorization: `Bearer ${bearerTokenValue}`,
                },
            });
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            cy.task('setValue', {key: 'body_valuation_samples_id', value: response.body});
        });
    });
});

When('I make "valuations_id" GET request with {string} and expect response code is 200', (params) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.task('getValue', {key: 'mid'}).then((mid) => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/valuations/id/${mid}?${params}&include=retail,historical,forecast`,
                headers: {
                    authorization: `Bearer ${bearerTokenValue}`,
                },
            });
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            cy.task('setValue', {key: 'body_valuations_id', value: response.body});
        });
    });
});

When('I make "valuations_vin" GET request with {string} and expect response code is 200', (params) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.task('getValue', {key: 'vin'}).then((vin) => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/valuations/vin/${vin}?${params}&include=retail,historical,forecast`,
                headers: {
                    authorization: `Bearer ${bearerTokenValue}`,
                },
            });
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            cy.task('setValue', {key: 'body_valuations_vin', value: response.body});
        });
    });
});

When('I make "valuations_search" GET request with {string} and expect response code is 200', (params) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/valuations/search/2021/TOYOTA/COROLLA/4D HATCHBACK NIGHTSHADE?${params}&include=retail,historical,forecast`,
            headers: {
                authorization: `Bearer ${bearerTokenValue}`,
            },
        });
    }).then((response) => {
        expect(response).property('status').to.equal(200);
        cy.task('setValue', {key: 'body_valuations_search', value: response.body});
    });
});

When('I make "listing_id_sonar" GET request and expect response code is 200', () => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.task('getValue', {key: 'listingId'}).then((listingId) => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/listings/id/${listingId}?fields=id,mid,vin,pickupLocation,pickupRegion,pickupLocationCountry,channels,currency,statuses,conditionGradeNumeric,odometer,odometerUnits,trims,exteriorColor,yearId,makeId,modelIds,year,make,models,hasAutocheck,autocheckCsHash,isEligibleForCarfax,carfaxCsHash,sellerNumber,mmrPrice,bidPrice,isAutoGradeOrManheimGrade&include=true`,
                headers: {
                    authorization: `Bearer ${bearerTokenValue}`,
                },
            });
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            cy.task('setValue', {key: 'body_listing_id_sonar', value: response.body});
        });
    });
});

When('I make "listing_vin_sonar" GET request and expect response code is 200', () => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.task('getValue', {key: 'vin'}).then((vin) => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}/listings/vin/${vin}?fields=id,mid,vin,pickupLocation,pickupRegion,pickupLocationCountry,channels,currency,statuses,conditionGradeNumeric,odometer,odometerUnits,trims,exteriorColor,yearId,makeId,modelIds,year,make,models,hasAutocheck,autocheckCsHash,isEligibleForCarfax,carfaxCsHash,sellerNumber,mmrPrice,bidPrice,isAutoGradeOrManheimGrade&include=true`,
                headers: {
                    authorization: `Bearer ${bearerTokenValue}`,
                },
            });
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            cy.task('setValue', {key: 'body_listing_vin_sonar', value: response.body});
        });
    });
});

When('from valuations "years", I make valuations "makes" GET request with {string} and expect response code is 200', (params) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/valuations/years/2022/makes?${params}`,
            headers: {
                authorization: `Bearer ${bearerTokenValue}`,
            },
        });
    }).then((response) => {
        expect(response).property('status').to.equal(200);
        cy.task('setValue', {key: 'body_valuations_makes_for_year', value: response.body});
    });
});

When('from valuations "years", I make valuations "models" GET request with {string} and expect response code is 200', (params) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/valuations/years/2021/makes/HONDA/models?${params}`,
            headers: {
                authorization: `Bearer ${bearerTokenValue}`,
            },
        });
    }).then((response) => {
        expect(response).property('status').to.equal(200);
        cy.task('setValue', {key: 'body_valuations_models_for_year', value: response.body});
    });
});

When('from valuations "years", I make valuations "styles" GET request with {string} and expect response code is 200', (params) => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/valuations/years/2021/makes/TOYOTA/models/COROLLA/trims?${params}`,
            headers: {
                authorization: `Bearer ${bearerTokenValue}`,
            },
        });
    }).then((response) => {
        expect(response).property('status').to.equal(200);
        cy.task('setValue', {key: 'body_valuations_styles_for_year', value: response.body});
    });
});

When('I make "searches" POST request to get mid,vin or listingId and expect response code is 200', () => {
    cy.getValidBearerToken();
    cy.task('getValue', {key: 'bearerToken'}).then((bearerTokenValue) => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/searches`,
            headers: {
                authorization: `Bearer ${bearerTokenValue}`,
                'Content-Type': 'application/vnd.manheim.v9+json',
            },
            body: {
                includeAllFields: false,
                executeNow: true,
                includeEnrichments: false,
                includeImages: false,
                includeFacets: false,
                hasSellerDisclosure: true,
                limit: 100,
                statusIds: ['00000000-0000-1000-0000-000000050083', '00000000-0000-1000-0000-000000050084'],
                fields: [
                    "vin", "mid", "id"
                ]
            },
        });
    }).then((response) => {
        expect(response).property('status').to.equal(200);
        cy.task('setValue', {key: 'mid', value: response.body.items[3].mid});
        cy.task('setValue', {key: 'vin', value: response.body.items[3].vin});
        cy.task('setValue', {key: 'listingId', value: response.body.items[3].id});
        cy.log(response.body.items[3].mid);
        cy.log(response.body.items[3].vin);
        cy.log(response.body.items[3].id);
    });
});
