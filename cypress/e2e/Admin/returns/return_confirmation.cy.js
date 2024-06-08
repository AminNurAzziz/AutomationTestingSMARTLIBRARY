describe('Return Confirmation', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Return', { timeout: 10000 }).should('be.visible').click();
    });

    it("Check system behavior when return is confirmed", () => {
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"][id^=":r"]').type('KD-P2663854991tvR');
        cy.contains('Submit').click();

        cy.contains('KD-P2663854991tvR', { timeout: 10000 }).should('be.visible');
        cy.contains('dipinjam').should('be.visible');

        cy.get('.MuiButtonBase-root').contains('Return').click();

        cy.contains('Go Back', { timeout: 10000 }).should('be.visible').click();
    });

    it("Check system behavior when penalties's applied, the fine amount will displayed and extend button is disabled", () => {
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"][id^=":r"]').type('KD-P2663854991tvR');
        cy.contains('Submit').click();

        cy.contains('KD-P2663854991tvR', { timeout: 10000 }).should('be.visible');
        cy.contains('dipinjam').should('be.visible');

        cy.contains('You cannot extend the book because it is overdue by 7 days.', { timeout: 10000 }).should('be.visible');

        cy.get('.MuiGrid-root').contains('Extend').should('be.disabled');
        cy.get('.MuiGrid-root').contains('Return').should('be.visible');
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
