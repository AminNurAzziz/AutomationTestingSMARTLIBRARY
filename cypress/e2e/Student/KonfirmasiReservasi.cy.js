describe('Return Book Feature', () => {
    beforeEach(() => {
        cy.visit('/'); // Ganti '/' dengan URL halaman utama Anda
    });

    it('TC_RETURN_001: Test Basic Scan Button Functionality', () => {
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"][id^=":r"]').type('KD-R2663854991axG');
        cy.contains('Submit').click();

        cy.contains('KD-R2663854991axG', { timeout: 10000 }).should('be.visible');
        cy.contains('menunggu konfirmasi').should('be.visible');

        cy.get('.MuiGrid-root').contains('Confirm').click();

        cy.contains('Go Back', { timeout: 10000 }).should('be.visible').click();

    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
