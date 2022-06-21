import {Then} from "cypress-cucumber-preprocessor/steps";
import {elementStore} from "../../support/elementStore";

/* eslint-disable */
Then(`I expect to see base mmr section shows default data`, () => {
  cy.get(elementStore["Vehicle Base Mmr Price Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Average Odometer Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Average Condition Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Base Mmr Typical Range Text"]).invoke('text').should('eq', '- -');
});

Then(`I expect to see mmr adjustments section lists are enabled`, () => {
  cy.get(elementStore["Adjusted Odometer Text"]).should('be.enabled');
  cy.get(elementStore["Adjusted Region List"]).should('be.enabled');
  cy.get(elementStore["Adjusted Condition List"]).should('be.enabled');
  cy.get(elementStore["Adjusted Color List"]).should('be.enabled');
});

Then(`I expect to see mmr adjustments section lists are disabled`, () => {
  cy.get(elementStore["Adjusted Odometer Text"]).should('be.disabled');
  cy.get(elementStore["Adjusted Region List"]).should('be.disabled');
  cy.get(elementStore["Adjusted Condition List"]).should('be.disabled');
  cy.get(elementStore["Adjusted Color List"]).should('be.disabled');
});

Then(`I expect to see mmr adjustments section show default data`, () => {
  cy.get(elementStore["Adjusted Odometer Text"]).invoke('val').should('eq', '');
  cy.get(elementStore["Adjusted Region List"]).invoke('val').should('eq', '');
  cy.get(elementStore["Adjusted Condition List"]).invoke('val').should('eq', '');
  cy.get(elementStore["Adjusted Color List"]).invoke('val').should('eq', '');
  cy.get(elementStore["Odometer Delta Text"]).invoke('val').should('eq', '');
  cy.get(elementStore["Region Delta Text"]).invoke('val').should('eq', '');
  cy.get(elementStore["Auto Grade Delta Text"]).invoke('val').should('eq', '');
  cy.get(elementStore["Exterior Color Delta Text"]).invoke('val').should('eq', '');
});

Then(`I expect to see adjusted mmr section shows default data`, () => {
  cy.get(elementStore["Adjusted Mmr Value Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Below Mmr Value Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Average Mmr Value Text"]).invoke('text').should('eq', '- -');
  cy.get(elementStore["Above Mmr Value Text"]).invoke('text').should('eq', '- -');
});

Then(`I expect to see grade list in mmr adjustments section contains all valid grades`, () => {
  cy.get(elementStore["Adjusted Condition List"]).invoke('text').should('include',
    'Grade** 5.0 4.9 4.8 4.7 4.6 4.5 4.4 4.3 4.2 4.1 4.0 3.9 3.8 3.7 3.6 3.5 3.4 3.3 3.2 3.1 3.0 2.9 2.8 2.7 2.6 2.5 2.4 2.3 2.2 2.1 2.0 1.9 1.8 1.7 1.6 1.5 1.4 1.3 1.2 1.1 1.0 0.9 0.8 0.7 0.6 0.5 0.4 0.3 0.2 0.1 0.0');
});

Then(`I expect to see color list in mmr adjustments section contains all valid colors`, () => {
  cy.get(elementStore["Adjusted Color List"]).invoke('text').should('include',
    'Ext Color Beige Black Blue Brown Burgundy Camouflage Charcoal Gold Gray Green Lime Off-white Orange Pink Purple Red Silver Turquoise White Yellow');
});

Then(`I expect to see region list in mmr adjustments section contains all valid regions for US`, () => {
  cy.get(elementStore["Adjusted Region List"]).invoke('text').should('include',
    'Region National Southeast Northeast Midwest Southwest West Coast');
});

Then(`I expect to see region list in mmr adjustments section contains all valid regions for Canada`, () => {
  cy.get(elementStore["Adjusted Region List"]).invoke('text').should('include',
    'Region National Ontario Quebec Atlantic Western');
});

Then(`I expect to see base mmr section shows correct data`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      case 'CanadaVin':
        testData.push('C$8,825', '96,159', '3.4', 'C$7,225 -C$10,400');
        break;
      default:
        testData.push('$8,825', '96,159', '3.4', '$7,225 -$10,400');
        break;
    }
  }).then(() => {
    cy.get(elementStore["Vehicle Base Mmr Price Text"]).invoke('text').should('eq', testData[0]);
    cy.get(elementStore["Average Odometer Text"]).invoke('text').should('eq', testData[1]);
    cy.get(elementStore["Average Condition Text"]).invoke('text').should('eq', testData[2]);
    cy.get(elementStore["Base Mmr Typical Range Text"]).invoke('text').should('eq', testData[3]);
  });
});

Then(`I expect to see mmr adjustments section shows correct data`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      case 'VinWithAutoGradeOrManheimGradeIsFalse':
        testData.push('-$1,000', '', '', '-$10');
        break;
      case 'VinWithPositiveAdjustment':
        testData.push('+$1,000', '+$30', '+$700', '+$10');
        break;
      case 'VinWithNegativeAdjustment':
        testData.push('-$1,000', '-$30', '-$700', '-$10');
        break;
      case 'VinWithZeroAdjustment':
        testData.push('$0', '$0', '$0', '$0');
        break;
      case 'VinWithBlankAdjustment':
        testData.push('- -', '- -', '- -', '- -');
        break;
      case 'DeeplinkWithOnlyVIN':
        testData.push('+$1,000', '', '+$700', '+$10');
        break;
      case 'DeeplinkWithOnlyListingId':
        testData.push('+$1,000', '', '+$700', '+$10');
        break;
      case 'CanadaVin':
        testData.push('+C$1,000', '', '+C$700', '+C$10');
        break;
      case 'TabletView':
        testData.push('+$1,000', '', '+$700', '+$10');
        break;
      default:
        testData.push('-$1,000', '', '-$700', '-$10');
        break;
    }
  }).then(() => {
    cy.get(elementStore["Odometer Delta Text"]).invoke('text').should('eq', testData[0]);
    cy.get(elementStore["Region Delta Text"]).invoke('text').should('eq', testData[1]);
    cy.get(elementStore["Auto Grade Delta Text"]).invoke('text').should('eq', testData[2]);
    cy.get(elementStore["Exterior Color Delta Text"]).invoke('text').should('eq', testData[3]);
  });
});

Then(`I expect to see adjusted mmr section shows correct data`, () => {
  let testData = [];
  cy.task('getValue', {key: 'testCase'}).then((testCaseValue) => {
    switch(testCaseValue) {
      case 'VinWithAutoGradeOrManheimGradeIsFalse':
        testData.push('$7,800', '$7,225', '$8,825', '$10,400');
        break;
      case 'VinWithAutoGradeOrManheimGradeIsTrue':
        testData.push('$7,100', '$7,225', '$8,825', '$10,400');
        break;
      case 'VinWithPositiveAdjustment':
        testData.push('$10,000', '$7,225', '$8,825', '$10,400');
        break;
      case 'VinWithNegativeAdjustment':
        testData.push('$7,100', '$7,225', '$8,825', '$10,400');
        break;
      case 'VinWithZeroAdjustment':
        testData.push('$8,825', '$7,225', '$8,825', '$10,400');
        break;
      case 'VinWithBlankAdjustment':
        testData.push('$7,100*', '$7,225', '$7,100', '$10,400');
        break;
      case 'DeeplinkWithOnlyVIN':
        testData.push('$10,000', '$7,225', '$8,825', '$10,400');
        break;
      case 'DeeplinkWithOnlyListingId':
        testData.push('$10,000', '$7,225', '$8,825', '$10,400');
        break;
      case 'CanadaVin':
        testData.push('C$10,000', 'C$7,225', 'C$8,825', 'C$10,400');
        break;
      case 'TabletView':
        testData.push('$10,000', '$7,225', '$8,825', '$10,400');
        break;
      default:
        testData.push('- -', '$7,225', '$8,825', '$10,400');
        break;
    }
  }).then(() => {
    cy.get(elementStore["Adjusted Mmr Value Text"]).invoke('text').should('eq', testData[0]);
    cy.get(elementStore["Below Mmr Value Text"]).invoke('text').should('eq', testData[1]);
    cy.get(elementStore["Average Mmr Value Text"]).invoke('text').should('eq', testData[2]);
    cy.get(elementStore["Above Mmr Value Text"]).invoke('text').should('eq', testData[3]);
  });
});
/* eslint-enable */
