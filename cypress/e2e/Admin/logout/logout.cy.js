describe('Logout', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it("Check system behavior when user logout successfully", () => {
        cy.get('.MuiAlert-action button[aria-label="Close"]').click();

        cy.get('.dropdown-toggle').click();
        cy.get('.dropdown-menu').contains('Logout').click();

        cy.contains('Login', { timeout: 10000 }).should('be.visible');
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
