describe('Check search data of manage borrowing functionality', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Manage Borrowing').click();
    });

    it("Check system behavior when user searches manage borrowing data by Kode Peminjaman", () => {
        cy.get('.form-control').type('KD-P2663854991M6Q');
        cy.contains('Quia aut autem.');
    });

    it("Check system behavior when user searches manage borrowing data by Judul Buku", () => {
        cy.get('.form-control').type('The Great Gatsby');
        cy.get('table tbody tr').should('have.length', 0);
    });

    it("Check system behavior when user searches manage borrowing data by NIM", () => {
        cy.get('.form-control').type('1234567890');
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