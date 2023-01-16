/// <reference types="cypress" />

describe('happy path', () => {

  it('runs happy path successfully', () => {
    cy.visit('/');
    cy.getTestEl('table_link').should('be.visible');
    cy.getTestEl('you_go_link').should('be.visible');
    cy.getTestEl('policyholders_link').should('be.visible');

    cy.intercept({
        method: 'GET',
        url: '/api/policyholders',
    },{fixture: 'policyHolders.json'}
    ).as('getPolicyHolders')
    
    cy.get('[data-testid="policyholders_link"]').click()
     
    cy.wait('@getPolicyHolders', {timeout: 3000}).then((interception) => {
        expect(interception.response.statusCode).equal(200)
    })
     // Cell for 'Age' row value should be visible
    cy.get(':nth-child(2) > .css-1miykz9-MuiTableCell-root').should('be.visible')
    // The value in the 'Age' row value cell should match the value in our text fixture, verifying that the data displayed is from the intercepted request
    cy.get(':nth-child(2) > .css-1miykz9-MuiTableCell-root').contains(55)
  });
});
