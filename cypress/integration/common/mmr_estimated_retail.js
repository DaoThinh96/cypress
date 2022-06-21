import {Then} from "cypress-cucumber-preprocessor/steps";
import {elementStore} from "../../support/elementStore";

/* eslint-disable */
Then(`I expect to see estimated retail value section shows default data`, () => {
  cy.get(elementStore["Estimated Retail Price Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Estimated Retail Typical Range Text"]).invoke('text').should('eq', '- -');
});

Then(`I expect to see estimated retail value section shows correct data`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      case 'VinWithBlankAdjustment':
        testData.push('$11,450*', '$9,575 -$13,350');
        break;
      case 'CanadaVin':
        testData.push('C$11,450', 'C$9,575 -C$13,350');
        break;
      default:
        testData.push('$11,450', '$9,575 -$13,350');
        break;
    }
  }).then(() => {
    cy.get(elementStore["Estimated Retail Price Text"]).invoke('text').should('eq', testData[0]);
    cy.get(elementStore["Estimated Retail Typical Range Text"]).invoke('text').should('eq', testData[1]);
  });

});
/* eslint-enable */
