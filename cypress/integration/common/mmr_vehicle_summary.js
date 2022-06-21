import {Then} from "cypress-cucumber-preprocessor/steps";
import {elementStore} from "../../support/elementStore";

/* eslint-disable */
Then(`I expect to see vehicle summary show correct VIN`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      default:
        testData.push('5J6RE4H46BL103412');
        break;
    }
  }).then(() => {
    cy.get(elementStore["Vehicle Summary Vin Text"]).invoke('text').should('eq', testData[0]);
  });
});

Then(`I expect to see vehicle summary detail show correct data`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      case 'VinWithAutoGradeOrManheimGradeIsFalse':
        testData.push('71,136 CR - -GreenPA - Manheim Pittsburgh');
        break;
      default:
        testData.push('71,136 CR 3.6GreenPA - Manheim Pittsburgh');
        break;
    }
  }).then(() => {
    cy.get(elementStore["Vehicle Summary Detail Text"]).invoke('text').should('eq', testData[0]);
  });
});
/* eslint-enable */
