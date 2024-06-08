describe('Reservation Confirmation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Enter Manually').click();
    });


    it('Check system behavior when reservation status is waiting and confirmation is disabled', () => {
        cy.get('input[type="text"][id^=":r"]').type('KD-R2663854991uDH');
        cy.contains('Submit').click();
        cy.contains('KD-R2663854991uDH', { timeout: 10000 }).should('be.visible');
        cy.contains('menunggu').should('be.visible');
        cy.get('.MuiGrid-root').contains('Confirm').should('be.disabled');
    });

    it('Check system behavior when book status is available and reservation is confirmed successfully', () => {
        cy.get('input[type="text"][id^=":r"]').type('KD-R2663854991p81');
        cy.contains('Submit').click();
        cy.contains('KD-R2663854991p81', { timeout: 10000 }).should('be.visible');
        cy.contains('menunggu konfirmasi').should('be.visible');
        cy.get('.MuiGrid-root').contains('Confirm').click();
        cy.contains('Go Back', { timeout: 10000 }).should('be.visible').click();
    });
});
