import {Then} from 'cypress-cucumber-preprocessor/steps';
import {elementStore} from '../../support/elementStore';

/* eslint-disable */
Then(`I expect to see value of the {string} is {string}`, (element, value) => {
  cy.get(elementStore[element]).invoke('val').should('eq', value);
});

Then(`I expect to see value of the {string} is not empty`, (element) => {
  cy.get(elementStore[element]).invoke('val').should('not.be.empty');
});

Then(`I expect to see value of the {string} is empty`, (element) => {
  cy.get(elementStore[element]).invoke('val').should('be.empty');
});
/* eslint-enable */
