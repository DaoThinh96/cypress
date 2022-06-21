import {Then} from 'cypress-cucumber-preprocessor/steps';
import {elementStore} from '../../support/elementStore';

/* eslint-disable */
Then(`I expect to see text of the {string} is cleared`, (element) => {
  cy.xpath(elementStore[element]).invoke('text').should('eq', 'undefined');
});

Then(`I expect not to see text of the {string} is cleared`, (element) => {
  cy.xpath(elementStore[element]).invoke('text').should('not.eq', 'undefined');
});

Then(`I expect to see text of the {string} does not show - -`, (element) => {
  cy.get(elementStore[element]).should(($el) => {
    expect($el.text()).to.not.eq('- -');
  });
});

Then(`I expect to see text of the {string} shows - -`, (element) => {
  cy.get(elementStore[element]).should(($el) => {
    expect($el.text()).to.eq('- -');
  });
});
/* eslint-enable */
