import {Then} from "cypress-cucumber-preprocessor/steps";
import {elementStore} from "../../support/elementStore";

/* eslint-disable */
Then(`I expect to see year, make, model, style dropdown show correct data`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      default:
        testData.push('2011', 'HONDA', 'CR-V 4WD', '4D SUV SE');
        break;
    }
  }).then(() => {
    cy.xpath(elementStore["Selected Year Item"]).invoke('text').should('eq', testData[0]);
    cy.xpath(elementStore["Selected Make Item"]).invoke('text').should('eq', testData[1]);
    cy.xpath(elementStore["Selected Model Item"]).invoke('text').should('eq', testData[2]);
    cy.xpath(elementStore["Selected Style Item"]).invoke('text').should('eq', testData[3]);
    cy.get(elementStore["Vehicle Summary Title Text"]).should('be.visible').invoke('text')
      .should('eq', `${testData[0]} ${testData[1]} ${testData[2]} ${testData[3]}`);
  });
});

Then(`I expect to see year, make, model, style dropdown show default data`, () => {
  cy.xpath(elementStore["Selected Year Item"]).invoke('text').should('eq', 'undefined');
  cy.xpath(elementStore["Selected Make Item"]).invoke('text').should('eq', 'undefined');
  cy.xpath(elementStore["Selected Model Item"]).invoke('text').should('eq', 'undefined');
  cy.xpath(elementStore["Selected Style Item"]).invoke('text').should('eq', 'undefined');
});
/* eslint-enable */
