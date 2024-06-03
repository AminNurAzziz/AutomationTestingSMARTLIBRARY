describe('Dashboard Page', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it('Displays the dashboard with correct data', () => {
        cy.get('.container-fluid').should('be.visible');

        // Verifikasi informasi dashboard
        cy.contains('Student Borrow').should('be.visible');
        cy.contains('Borrowing').should('be.visible');
        cy.contains('Book Available').should('be.visible');
        cy.contains('Fine').should('be.visible');


        // Verifikasi chart Monthly Borrowing Trend
        cy.contains('Monthly Borrowing Trend').should('be.visible');
        cy.get('.chart-area').should('be.visible');

        // Verifikasi chart Most Borrowed Books
        cy.contains('Most Borrowed Books').should('be.visible');
        cy.get('.chart-pie').should('be.visible');
    });
});

describe('Report Download', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it('Exports the dashboard data to Excel', () => {
        cy.get('.navbar').contains('Export to Excel').click();
        cy.wait(2000); // Tunggu hingga unduhan selesai

        // Verifikasi bahwa file Excel diunduh
        cy.readFile('cypress/downloads/monthly_borrowing_trend.xlsx').should('exist');
    });

    it('Exports the dashboard data to PDF', () => {
        cy.get('.navbar').contains('Export to PDF').click();
        cy.wait(2000); // Tunggu hingga unduhan selesai

        // Verifikasi bahwa file PDF diunduh
        cy.readFile('cypress/downloads/Laporan Trend Peminjaman.pdf').should('exist');
    });
});

describe('Sidebar Navigation', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it('Navigates to the Dashboard page', () => {
        cy.get('.nav-link').contains('Dashboard').click();
        // cy.url().should('include', '/dashboard');
    });

    it('Navigates to the Manage Borrowing page', () => {
        cy.contains('Manage Borrowing').click();
        // cy.url().should('include', '/
    });


    it('Navigates to the Student page', () => {
        cy.contains('Manage Student').click();
        // cy.url().should('include', '/student');
    });

    it('Navigates to the Regulation page', () => {
        cy.contains('Regulation').click();
        // cy.url().should('include', '/user');
    });

    it('Navigates to the Return page', () => {
        cy.contains('Return').click();
        // cy.url().should('include', '/user');
    });

    it('Navigates to the Borrwing page', () => {
        cy.contains('Borrowing').click();
        // cy.url().should('include', '/user');
    });
});

function loginWithCorrectCredentials() {
    cy.get('#email').clear().type('admin@example.com');
    cy.get('#password').clear().type('password');
    cy.get('form').submit();
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent the error from failing the test
    return false;
});
