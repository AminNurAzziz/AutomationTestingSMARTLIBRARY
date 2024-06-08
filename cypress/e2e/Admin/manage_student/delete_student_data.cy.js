describe('Delete Student Data', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Manage Student').click();
    });

    it("Check system behavior when student data is deleted", () => {
        cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('.btn.btn-danger.ml-2').first().click();
        cy.get('svg[data-testid="DeleteIcon"]').should('be.visible');
        cy.get('.modal-footer').contains('Yes, Delete').click();
        cy.contains('Student successfully deleted').should('be.visible');
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
