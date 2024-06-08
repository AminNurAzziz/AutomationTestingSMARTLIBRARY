describe('Check download report of borrowing data functionality', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Manage Borrowing').click();
    });

    it("Check system behavior when report is downloaded in format of PDF", () => {
        cy.contains('Download PDF').click();
        cy.wait(2000);

        cy.readFile('cypress/downloads/HistoryPeminjaman.pdf').should('exist');
    });

    it("Check system behavior when report is downloaded in format of Excel", () => {
        cy.get('.btn.btn-success').click();
        cy.wait(2000);

        cy.readFile('cypress/downloads/HistoryPeminjaman.xlsx').should('exist');
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