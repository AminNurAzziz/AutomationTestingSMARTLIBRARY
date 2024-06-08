describe('Admin Dashboard', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
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

    it('Check system behavior when report is downloaded in format of PDF', () => {
        cy.get('.navbar').contains('Export to PDF').click();
        cy.wait(2000);
        cy.readFile('cypress/downloads/Laporan Trend Peminjaman.pdf').should('exist');
        cy.readFile('cypress/downloads/Top 4 Books Favorite.pdf').should('exist');
    });

    it('Check system behavior when report is downloaded in format of Excel', () => {
        cy.get('.navbar').contains('Export to Excel').click();
        cy.wait(2000);
        cy.readFile('cypress/downloads/monthly_borrowing_trend.xlsx').should('exist');
        cy.readFile('cypress/downloads/most_borrowed_books.xlsx').should('exist');
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
