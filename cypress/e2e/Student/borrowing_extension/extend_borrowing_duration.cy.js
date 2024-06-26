describe('Extend Borrowing Duration', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Return', { timeout: 10000 }).should('be.visible').click();
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"][id^=":r"]').type('KD-P2663854991gD0');
        cy.contains('Submit').click();
    });

    it('Check system behavior when borrowing duration is confirmed', () => {
        cy.contains('KD-P2663854991gD0', { timeout: 10000 }).should('be.visible');
        cy.contains('dipinjam').should('be.visible');
        cy.get('.MuiGrid-root').contains('Extend').click();
        cy.contains('Selesai', { timeout: 10000 }).should('be.visible').click();
        cy.contains('Go Back', { timeout: 10000 }).should('be.visible').click();
    });
});


function loginWithCorrectCredentials() {
    cy.get('#email').clear().type('admin@example.com');
    cy.get('#password').clear().type('password');
    cy.get('form').submit();
}

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
