describe('Search Student Data', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Manage Student').click();
    });

    it("Check system behavior when student data is searched by Name", () => {
        cy.get('.form-control').type('Amin Nur Azziz');
        cy.get('table tbody tr').should('have.length', 1);
    });

    it("Check system behavior when student data is searched by NIM", () => {
        cy.get('.form-control').type('2131710034');
        cy.get('table tbody tr').should('have.length', 0);
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