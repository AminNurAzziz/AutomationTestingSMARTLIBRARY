describe('Admin Dashboard', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it("Check system behavior when displayed data is correct", () => {
        cy.get('.container-fluid').should('be.visible');
        cy.contains('Student Borrow').should('be.visible');
        cy.contains('Borrowing').should('be.visible');
        cy.contains('Book Available').should('be.visible');
        cy.contains('Fine').should('be.visible');
        cy.contains('Monthly Borrowing Trend').should('be.visible');
        cy.get('.chart-area').should('be.visible');
        cy.contains('Most Borrowed Books').should('be.visible');
        cy.get('.chart-pie').should('be.visible');
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
