describe('Download Student Report', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Manage Student').click();
    });

    it("Check system behavior when student data is downloaded in format of PDF", () => {
        cy.contains('Download PDF').click();
        cy.wait(2000);

        cy.readFile('cypress/downloads/students.pdf').should('exist');
    });

    it("Check system behavior when student data is downloaded in format of Excel", () => {
        cy.get('.btn.btn-success').click();
        cy.wait(2000);

        cy.readFile('cypress/downloads/students.xlsx').should('exist');
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