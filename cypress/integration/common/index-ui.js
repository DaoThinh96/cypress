import {When, Then} from 'cypress-cucumber-preprocessor/steps';
import {elementStore} from '../../support/elementStore';

/* eslint-disable */
When(`I set viewport to {string}`, (option) => {
  cy.viewport(option);
});

When(`I click the {string}`, (element) => {
  cy.get(elementStore[element]).first().should('be.visible').click();
});

When(`I enter {string} into the {string}`, (text, element) => {
  cy.get(elementStore[element]).first().should('be.visible').click().type(text);
});

When(`I select {string} in the {string}`, (option, element) => {
  cy.wait(Cypress.env('smallWait'));
  cy.get(elementStore[element]).should('be.visible').select(option);
});

When(`I scroll in the {string}`, (element) => {
  cy.get(elementStore[element]).first().should('be.visible').scrollTo(0, 1000, {duration: 1000}); // down 1000px
});

Then(`I expect to see the {string} is enabled`, (element) => {
  cy.get(elementStore[element]).first().should('be.enabled');
});

Then(`I expect to see the {string} is disabled`, (element) => {
  cy.get(elementStore[element]).first().should('be.disabled');
});

Then(`I expect the {string} to be visible`, (element) => {
  cy.get(elementStore[element]).should('be.visible');
});

Then(`I expect the {string} not to be visible`, (element) => {
  cy.get(elementStore[element]).should('not.exist');
});

Then(`I expect to see {string} in the {string}`, (text, element) => {
  cy.contains(elementStore[element], text);
});

Then(`I expect not to see text in the {string}`, (element) => {
  cy.get(elementStore[element]).should('not.contain.text');
});

Then(`I expect to see text of the {string} is {string}`, (element, text) => {
  cy.get(elementStore[element]).invoke('text').should('eq', text);
});

Then(`I expect to see text of the {string} includes {string}`, (element, text) => {
  cy.get(elementStore[element]).invoke('text').should('include', text);
});

Then(`I expect the link {string} is working`, (element) => {
  cy.get(elementStore[element]).then(($linkUrl) => {
    cy.wrap($linkUrl).invoke('attr', 'href').as('hrefUrl');
    cy.get('@hrefUrl').then((url) => {
      cy.request(`${url}`).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  });
});
/* eslint-enable */
