import {Then} from "cypress-cucumber-preprocessor/steps";
import {elementStore} from "../../support/elementStore";

/* eslint-disable */
Then(`I expect to see projected average section shows default data`, () => {
  cy.get(elementStore["Next Month Price Text"]).invoke('text').should('eq', '- -');
});

Then(`I expect to see projected average section shows correct data`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      case 'CanadaVin':
        testData.push('C$8,550');
        break;
      default:
        testData.push('$8,550');
        break;
    }
  }).then(() => {
    cy.get(elementStore["Next Month Price Text"]).invoke('text').should('eq', testData[0]);
  });
});
/* eslint-enable */
