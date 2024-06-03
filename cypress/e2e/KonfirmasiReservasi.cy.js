describe('Confirm Reservation Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/confirm-reservation-page');
  });

  it('Displays Reservation Confirmation Page', () => {
    cy.contains('Reserve Confirmation').should('be.visible');
    cy.contains('Student Information').should('be.visible');
    cy.contains('Borrowed Book Information').should('be.visible');
    cy.contains('Borrow Information').should('be.visible');
    cy.contains('Confirm').should('be.visible');
  });

  it('Allows User to Confirm Reservation', () => {
    cy.intercept('PATCH', '**/konfirmasi-reservasi/**').as('confirmReservation');
    cy.contains('Confirm').click();
    cy.wait('@confirmReservation').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      cy.url().should('include', '/borrow-confirmation');
    });
  });

  it('Displays Loading Spinner During Confirmation', () => {
    cy.window().its('store').invoke('dispatch', { type: 'setIsLoading', payload: true });
    cy.contains('Sedang memproses...').should('be.visible');
  });
});
