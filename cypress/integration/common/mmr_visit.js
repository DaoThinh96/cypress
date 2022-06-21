import {Given} from 'cypress-cucumber-preprocessor/steps';
import {elementStore} from "../../support/elementStore";

/* eslint-disable */
Given(`I am on an empty MMR page of country {string}`, (country) => {
  cy.visit(`http://localhost:8080/?stubs=true&country=${country}`, {failOnStatusCode: false});
  expect(cy.title().should('contain', 'MMR'));
  cy.get(elementStore["Select Year List"]).should('be.enabled');
});
/* eslint-enable */
