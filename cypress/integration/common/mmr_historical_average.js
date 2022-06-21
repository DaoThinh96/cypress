import {Then} from "cypress-cucumber-preprocessor/steps";
import {elementStore} from "../../support/elementStore";

/* eslint-disable */
Then(`I expect to see historical average section shows default data`, () => {
  cy.get(elementStore["Past 30 Days Price Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Past 30 Days Odometer Text"]).should('not.exist');
  cy.get(elementStore["Six Months Ago Price Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Six Months Ago Odometer Text"]).should('not.exist');
  cy.get(elementStore["Last Year Price Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Last Year Odometer Text"]).should('not.exist');
});

Then(`I expect to see historical average section shows correct data`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      case 'CanadaVin':
        testData.push('C$9,025', '96,159 km', 'C$10,050', '87,536 km', 'C$11,900', '75,132 km');
        break;
      default:
        testData.push('$9,025', '96,159 mi', '$10,050', '87,536 mi', '$11,900', '75,132 mi');
        break;
    }
  }).then(() => {
    cy.get(elementStore["Past 30 Days Price Text"]).invoke('text').should('eq', testData[0]);
    cy.get(elementStore["Past 30 Days Odometer Text"]).invoke('text').should('eq', testData[1]);
    cy.get(elementStore["Six Months Ago Price Text"]).invoke('text').should('eq', testData[2]);
    cy.get(elementStore["Six Months Ago Odometer Text"]).invoke('text').should('eq', testData[3]);
    cy.get(elementStore["Last Year Price Text"]).invoke('text').should('eq', testData[4]);
    cy.get(elementStore["Last Year Odometer Text"]).invoke('text').should('eq', testData[5]);
  });
});
/* eslint-enable */
