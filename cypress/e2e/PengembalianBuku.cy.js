describe('Return Page Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/return-page');
  });

  it('Displays Return Confirmation Page Successfully', () => {
    // Ensure that the Return Confirmation page is displayed
    cy.contains('Return Confirmation').should('be.visible');
    cy.contains('Student Information').should('be.visible');
    cy.contains('Borrowed Book Information').should('be.visible');
    cy.contains('Borrow Information').should('be.visible');
    cy.contains('Return').should('be.visible');
    cy.contains('Extend').should('be.visible');
  });

  it('Allows user to return book successfully', () => {
    // Click on the "Return" button
    cy.contains('Return').click();

    // Verify that the user is redirected to the confirmation page
    cy.url().should('include', '/borrow-confirmation');
  });

  it('Allows user to extend book successfully', () => {
    // Click on the "Extend" button
    cy.contains('Extend').click();

    // Verify that the user is redirected to the extend receipt page
    cy.url().should('include', '/extend-receipt');
  });

  it('Displays error message when trying to extend overdue book', () => {
    // Ensure that the late days message is not initially displayed
    cy.contains('You cannot extend the book because it is overdue by').should('not.exist');

    // Wait for the page to load and the late days message to appear
    cy.contains('Return Confirmation').should('be.visible');

    // Simulate an overdue book by setting the late days to a positive value
    cy.window().its('store').invoke('dispatch', { type: 'setLateDays', payload: 7 });

    // Verify that the late days message is displayed
    cy.contains('You cannot extend the book because it is overdue by 7 days').should('be.visible');

    // Ensure that the "Extend" button is disabled
    cy.contains('Extend').should('be.disabled');
  });

  // Add more test cases as needed...
});
