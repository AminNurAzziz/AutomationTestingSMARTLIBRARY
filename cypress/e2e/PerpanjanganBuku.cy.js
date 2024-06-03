describe('Return Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/return-page');
  });

  it('Displays Return Confirmation Page', () => {
    cy.contains('Return Confirmation').should('be.visible');
    cy.contains('Student Information').should('be.visible');
    cy.contains('Borrowed Book Information').should('be.visible');
    cy.contains('Borrow Information').should('be.visible');
    cy.contains('Return').should('be.visible');
    cy.contains('Extend').should('be.visible');
  });

  it('Allows User to Return Book', () => {
    cy.intercept('PATCH', '**/pengembalian-buku/**').as('returnBook');
    cy.contains('Return').click();
    cy.wait('@returnBook').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      cy.url().should('include', '/borrow-confirmation');
    });
  });

  it('Allows User to Extend Book', () => {
    cy.intercept('PATCH', '**/perpanjangan-buku/**').as('extendBook');
    cy.contains('Extend').click();
    cy.wait('@extendBook').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      cy.url().should('include', '/extend-receipt');
    });
  });

  it('Displays Late Days Message and Disables Extend Button', () => {
    cy.window().its('store').invoke('dispatch', { type: 'setLateDays', payload: 7 });
    cy.contains('You cannot extend the book because it is overdue by 7 days').should('be.visible');
    cy.contains('Extend').should('be.disabled');
  });
});
