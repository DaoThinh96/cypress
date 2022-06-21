import {Then} from "cypress-cucumber-preprocessor/steps";
import {elementStore} from "../../support/elementStore";

/* eslint-disable */
Then(`I expect to see transaction table shows default data`, () => {
  cy.get(elementStore["Transaction Table"]).should('not.exist');
});

Then(`I expect to see transaction table shows correct data`, () => {
  const tableData = [
    ['7/12/17', '$9,600', '102,161', '- -', '4G/A', 'Blue', 'Regular', 'Northeast', 'New Jersey'],
    ['6/18/17', '$7,100', '179,808', '3.3', '4G/A', 'Gray', 'Regular', 'Northeast', 'NY Metro Skyline'],
    ['6/16/17', '$10,900', '70,213', '4.5', '4G/A', 'Gray', 'Regular', 'Northeast', 'Pennsylvania'],
    ['6/15/17', '$8,100', '80,259', '2.6', '4G/A', 'White', 'Lease', 'Midwest', 'Cincinnati'],
    ['6/14/17', '$9,100', '64,892', '2.4', '4G/A', 'Gray', 'Regular', 'Southeast', 'Central Florida'],
    ['6/13/17', '$10,200', '74,423', '4.1', '4G/A', 'Blue', 'Regular', 'Northeast', 'NY Metro Skyline']
  ];
  for(let i = 0; i < tableData.length; i++) {
    let cube = tableData[i];
    for(let j = 0; j < cube.length; j++) {
      cy.get(elementStore["Transaction Table"]).find('tr').eq(i).find('td').eq(j).invoke('text').should('eq', cube[j]);
    }
  }
});

Then(`I expect to see transaction table shows correct data for Canada VIN`, () => {
  const tableData = [
    ['7/12/17', 'C$9,600', '102,161', '- -', '4G/A', 'Blue', 'Regular', 'Ontario', 'Toronto'],
    ['6/18/17', 'C$7,100', '179,808', '3.3', '4G/A', 'Gray', 'Regular', 'Ontario', 'Toronto'],
    ['6/16/17', 'C$10,900', '70,213', '4.5', '4G/A', 'Gray', 'Regular', 'Western', 'Canada Mobile Sale'],
    ['6/15/17', 'C$8,100', '80,259', '2.6', '4G/A', 'White', 'Lease', 'Western', 'Canada Mobile Sale'],
    ['6/14/17', 'C$9,100', '64,892', '2.4', '4G/A', 'Gray', 'Regular', 'Ontario', 'Toronto'],
    ['6/13/17', 'C$10,200', '74,423', '4.1', '4G/A', 'Blue', 'Regular', 'Ontario', 'Toronto']
  ];
  for(let i = 0; i < tableData.length; i++) {
    let cube = tableData[i];
    for(let j = 0; j < cube.length; j++) {
      cy.get(elementStore["Transaction Table"]).find('tr').eq(i).find('td').eq(j).invoke('text').should('eq', cube[j]);
    }
  }
});
/* eslint-enable */
