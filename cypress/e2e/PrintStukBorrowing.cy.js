describe('Borrow Receipt Page Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/borrow-receipt');
  });

  it('Displays Borrow Receipt Page Successfully', () => {
    // Ensure that the Borrow Receipt page is displayed
    cy.contains('STRUK PEMINJAMAN').should('be.visible');
    cy.contains('Data Mahasiswa:').should('be.visible');
    cy.contains('Detail Peminjaman:').should('be.visible');
    cy.contains('QR Code:').should('be.visible');
    cy.get('input[type="checkbox"]').should('have.length', 2);
    cy.get('button').contains('Selesai').should('be.visible');
  });

  it('Allows user to print receipt', () => {
    // Check the print receipt checkbox
    cy.get('input[type="checkbox"]').first().check();

    // Click on the "Selesai" button
    cy.get('button').contains('Selesai').click();

    // Verify that the user is redirected to the confirmation page
    cy.url().should('include', '/borrow-confirmation');
  });

  it('Allows user to send receipt via email', () => {
    // Check the send email checkbox
    cy.get('input[type="checkbox"]').last().check();

    // Enter an email address
    cy.get('input[id="email"]').type('example@example.com');

    // Click on the "Selesai" button
    cy.get('button').contains('Selesai').click();

    // Verify that the user is redirected to the confirmation page
    cy.url().should('include', '/borrow-confirmation');
  });
});
